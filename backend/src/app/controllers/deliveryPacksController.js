import * as Yup from 'yup';
import { isBefore, isAfter, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import DeliveryPacks from '../models/DeliveryPacks';
import File from '../models/File';
import DeliveryPerson from '../models/DeliveryPerson';
import Recipients from '../models/Recipients';
import NewPackageMail from '../jobs/NewPackageMail';
import Queue from '../../lib/Queue';

class DeliveryPackController {
	async store(req, res) {
		const schema = Yup.object().shape({
			recipient_id: Yup.number().required(),
			deliveryperson_id: Yup.number().required(),
			product: Yup.string().required(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error:
					'The fields recipient_id, deliveryperson_id and product_id are mandatory.',
			});
		}

		const recipient = await Recipients.findByPk(req.body.recipient_id);
		if (!recipient) {
			return res.status(400).json({ error: 'Recipient id not found.' });
		}

		const deliveryPerson = await DeliveryPerson.findByPk(
			req.body.deliveryperson_id
		);
		if (!deliveryPerson) {
			return res
				.status(400)
				.json({ error: 'Delivery person id not found.' });
		}

		const {
			id,
			recipient_id,
			deliveryperson_id,
			product,
		} = await DeliveryPacks.create(req.body);

		await Queue.add(NewPackageMail.key, {
			id,
			deliveryPerson,
			recipient,
		});

		return res.json({
			id,
			recipient_id,
			deliveryperson_id,
			product,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			package_id: Yup.number().required(),
			recipient_id: Yup.number(),
			deliveryperson_id: Yup.number(),
			signature_id: Yup.number(),
			product: Yup.string(),
			canceled_at: Yup.date(),
			start_date: Yup.date(),
			end_date: Yup.date(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'The fields parsed are not correct.',
			});
		}

		const {
			package_id: packageId,
			recipient_id: recipientId,
			deliveryperson_id: deliverypersonId,
			signature_id: signatureId,
			start_date: startDate,
			end_date: endDate,
		} = req.body;

		/* Project option: The front end should send the date
		 *  It allows the offline start date, end date and cancellation.
		 */
		if (startDate) {
			const today = new Date(startDate);
			const afterDate = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate(),
				'08',
				'00',
				'00',
				'00'
			);
			const beforeDate = afterDate;
			beforeDate.setHours('18');
			if (!(isAfter(afterDate, today) && isBefore(today, beforeDate))) {
				return res.status(400).json({
					error:
						'Package collection must occur between 08:00 and 18:00h.',
				});
			}
		}

		if (recipientId) {
			const recipient = await Recipients.findByPk(recipientId);
			if (!recipient) {
				return res
					.status(400)
					.json({ error: 'Recipient id not found.' });
			}
		}
		if (deliverypersonId) {
			const deliveryPerson = await DeliveryPerson.findByPk(
				deliverypersonId
			);
			if (!deliveryPerson) {
				return res
					.status(400)
					.json({ error: 'Delivery person id not found.' });
			}
		}

		if (signatureId) {
			const signature = await File.findByPk(signatureId);
			if (!signature) {
				return res
					.status(400)
					.json({ error: 'Signature id not found.' });
			}
		}

		const pack = await DeliveryPacks.findByPk(packageId);
		if (!pack) {
			return res.status(400).json({ error: 'Package id not found.' });
		}

		if (endDate) {
			/* if the delivery person hasnt collected it yet... */
			if (!pack.start_date && !startDate) {
				return res.status(400).json({
					error: 'Start date have not been informed.',
				});
			}

			if (
				isBefore(
					parseISO(endDate),
					startDate ? parseISO(startDate) : pack.start_date
				)
			) {
				return res.status(400).json({
					error: 'Start date must come before end date.',
				});
			}
		}

		const {
			id,
			product,
			recipient_id,
			deliveryperson_id,
			signature_id,
			canceled_at,
			start_date,
			end_date,
		} = await pack.update(req.body);

		return res.json({
			id,
			product,
			recipient_id,
			deliveryperson_id,
			signature_id,
			canceled_at,
			start_date,
			end_date,
		});
	}

	async index(req, res) {
		const schema = Yup.object().shape({
			offset: Yup.number().transform((originalValue) =>
				originalValue <= 0 ? 1 : originalValue
			),
			limit: Yup.number().transform((originalValue) =>
				originalValue <= 0 ? 20 : originalValue
			),
			q: Yup.string(),
		});
		if (!(await schema.isValid(req.query))) {
			return res.status(400).json({
				error: 'offset and limit must be numbers.',
			});
		}
		const { offset = 1, limit = 20 } = await schema.cast(req.query);

		const count = await DeliveryPacks.count({
			where: {
				product: {
					[Op.iLike]: `%${req.query.q || ''}%`,
				},
			},
		});
		const deliveryPack = await DeliveryPacks.findAll({
			where: {
				product: {
					[Op.iLike]: `%${req.query.q || ''}%`,
				},
			},
			limit,
			offset: (offset - 1) * limit,
			attributes: [
				'id',
				'created_at',
				'product',
				'product',
				'canceled_at',
				'start_date',
				'end_date',
			],
			include: [
				{
					model: File,
					as: 'signature',
					attributes: ['name', 'path', 'url'],
				},
				{
					model: DeliveryPerson,
					as: 'deliveryperson',
					attributes: ['id', 'name', 'email'],
					include: [
						{
							model: File,
							as: 'avatar',
							attributes: ['id', 'path', 'url'],
						},
					],
				},
				{
					model: Recipients,
					as: 'recipient',
					attributes: [
						'id',
						'recipient',
						'street',
						'number',
						'complement',
						'state',
						'city',
						'postcode',
					],
				},
			],
			order: ['id'],
		});

		return res.json({
			deliveryPack,
			offset,
			limit,
			pages: Math.ceil(count / limit),
		});
	}

	async indexOne(req, res) {
		const schema = Yup.object().shape({
			id: Yup.number().required(),
		});
		if (!(await schema.isValid(req.params))) {
			return res
				.status(400)
				.json({ error: 'id must be an integer sent on params.' });
		}

		const deliveryPack = await DeliveryPacks.findOne({
			where: {
				id: req.params.id,
			},
			attributes: [
				'id',
				'product',
				'product',
				'canceled_at',
				'start_date',
				'end_date',
			],
			include: [
				{
					model: File,
					as: 'signature',
					attributes: ['name', 'path', 'url'],
				},
				{
					model: DeliveryPerson,
					as: 'deliveryperson',
					attributes: ['id', 'name', 'email'],
					include: [
						{
							model: File,
							as: 'avatar',
							attributes: ['id', 'path', 'url'],
						},
					],
				},
				{
					model: Recipients,
					as: 'recipient',
					attributes: [
						'id',
						'recipient',
						'street',
						'number',
						'complement',
						'state',
						'city',
						'postcode',
					],
				},
			],
		});
		if (!deliveryPack) {
			return res.status(400).json({ error: 'Package id not found.' });
		}
		return res.json({
			deliveryPack,
		});
	}

	async delete(req, res) {
		const schema = Yup.object().shape({
			id: Yup.number().required(),
		});
		if (!(await schema.isValid(req.query))) {
			return res
				.status(400)
				.json({ error: 'id must be an integer sent on query.' });
		}
		const deliveryPack = await DeliveryPacks.destroy({
			where: {
				id: req.query.id,
			},
		});
		if (deliveryPack > 0) {
			return res.status(200).json({
				delete: `Package with id ${req.query.id} have been removed.`,
			});
		}
		// Server side or client mistake?
		const findDeliveryPack = await DeliveryPacks.findByPk(req.query.id);
		if (findDeliveryPack) {
			return res.status(500).json({ error: 'Unkown Error' });
		}
		return res.status(400).json({ error: 'Package id does not exist.' });
	}

	async status(req, res) {
		const schema = Yup.object().shape({
			package_id: Yup.number().required(),
			deliveryperson_id: Yup.number(),
			start_date: Yup.date(),
			end_date: Yup.date(),
			signature_id: Yup.number().when('end_date', (end_date, field) =>
				!end_date ? field : field.required()
			),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'The fields parsed are not correct.',
			});
		}
		// Delivery person should not update any other field than these...
		const values = schema.cast(req.body, { stripUnknown: true });

		const {
			package_id: packageId,
			deliveryperson_id: deliverypersonId,
			signature_id: signatureId,
			start_date: startDate,
			end_date: endDate,
		} = req.body;
		let collectedPackages = 0;
		const pack = await DeliveryPacks.findOne({
			where: {
				id: packageId,
			},
			attributes: [
				'id',
				'created_at',
				'product',
				'product',
				'canceled_at',
				'start_date',
				'end_date',
			],
			include: [
				{
					model: File,
					as: 'signature',
					attributes: ['name', 'path', 'url'],
				},
				{
					model: DeliveryPerson,
					as: 'deliveryperson',
					attributes: ['id', 'name', 'email'],
					include: [
						{
							model: File,
							as: 'avatar',
							attributes: ['id', 'path', 'url'],
						},
					],
				},
				{
					model: Recipients,
					as: 'recipient',
					attributes: [
						'id',
						'recipient',
						'street',
						'number',
						'complement',
						'state',
						'city',
						'postcode',
					],
				},
			],
		});
		if (!pack) {
			return res.status(400).json({ error: 'Package id not found.' });
		}
		if (pack.canceled_at) {
			return res.status(400).json({
				error: 'Package has been canceled.',
			});
		}
		if (startDate) {
			if (pack.start_date) {
				return res.status(400).json({
					error: 'Package has already been collected.',
				});
			}

			const today = new Date(startDate);
			const afterDate = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate(),
				'00',
				'00',
				'00',
				'00'
			);
			const beforeDate = afterDate;
			beforeDate.setHours('18');
			if (!(isAfter(afterDate, today) && isBefore(today, beforeDate))) {
				return res.status(400).json({
					error:
						'Package collection must occur between 08:00 and 18:00h.',
				});
			}
			/* Check if the person has already collected 5 packages */
			collectedPackages = await DeliveryPacks.count({
				where: {
					deliveryperson_id: deliverypersonId,
					start_date: {
						[Op.between]: [startOfDay(today), endOfDay(today)],
					},
				},
			});
			if (collectedPackages >= 5) {
				return res.status(400).json({
					error:
						'A delivery person may take out at most 5 packages a day.',
				});
			}
		}
		if (deliverypersonId) {
			const deliveryPerson = await DeliveryPerson.findByPk(
				deliverypersonId
			);
			if (!deliveryPerson) {
				return res
					.status(400)
					.json({ error: 'Delivery person id not found.' });
			}
		}
		if (endDate) {
			if (pack.end_date) {
				return res.status(400).json({
					error: 'Package has already been delivered.',
				});
			}
			/* if the delivery person hasnt collected it yet... */
			if (!pack.start_date && !startDate) {
				return res.status(400).json({
					error: 'Start date have not been informed.',
				});
			}

			if (
				isBefore(
					parseISO(endDate),
					startDate ? parseISO(startDate) : pack.start_date
				)
			) {
				return res.status(400).json({
					error: 'Start date must come before end date.',
				});
			}
		}
		if (signatureId) {
			const signature = await File.findByPk(signatureId);
			if (!signature) {
				return res
					.status(400)
					.json({ error: 'Signature id not found.' });
			}
		}
		const updatedPack = await pack.update(values);
		return res.json({
			updatedPack,
			collectedPackages: collectedPackages + 1,
		});
	}
}

export default new DeliveryPackController();
