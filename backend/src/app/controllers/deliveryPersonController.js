import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryPerson from '../models/DeliveryPerson';
import DeliveryPacks from '../models/DeliveryPacks';
import Recipients from '../models/Recipients';
import File from '../models/File';

class DeliveryPersonController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			avatar_id: Yup.number(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'The fields name and email are mandatory.',
			});
		}

		const deliveryPerson = await DeliveryPerson.findOne({
			where: { email: req.body.email },
		});
		if (deliveryPerson) {
			return res
				.status(400)
				.json({ error: 'Delivery person email already exists.' });
		}

		const { id, name, email, avatar_id } = await DeliveryPerson.create(
			req.body
		);
		return res.json({
			id,
			name,
			email,
			avatar_id,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			id: Yup.string().required(),
			name: Yup.string(),
			avatar_id: Yup.number(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'body validation failed.' });
		}

		const updateEmail = req.body.email;
		const deliveryPerson = await DeliveryPerson.findByPk(req.body.id);
		if (!deliveryPerson) {
			return res
				.status(400)
				.json({ error: 'Delivery person id not found.' });
		}

		if (updateEmail && updateEmail !== deliveryPerson.email) {
			const deliveryPersonExists = await DeliveryPerson.findOne({
				where: { email: updateEmail },
			});
			if (deliveryPersonExists) {
				return res
					.status(400)
					.json({ error: 'Delivery person already exist.' });
			}
		}

		try {
			const {
				id,
				name,
				password,
				avatar_id,
				email,
			} = await deliveryPerson.update(req.body);

			return res.json({
				id,
				name,
				email,
				password,
				avatar_id,
			});
		} catch (error) {
			if (error.name === 'SequelizeForeignKeyConstraintError')
				return res
					.status(404)
					.json({ error: 'File for avatar_id not found.' });
			return res.status(500).json({ error });
		}
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

		const count = await DeliveryPerson.count({
			where: {
				name: {
					[Op.iLike]: `%${req.query.q || ''}%`,
				},
			},
		});
		const deliveryPerson = await DeliveryPerson.findAll({
			where: {
				name: {
					[Op.iLike]: `%${req.query.q || ''}%`,
				},
			},
			limit,
			offset: (offset - 1) * limit,
			attributes: ['id', 'name', 'email', 'avatar_id'],
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['name', 'path', 'url'],
				},
			],
			order: ['id'],
		});

		return res.json({
			deliveryPerson,
			offset,
			limit,
			pages: Math.ceil(count / limit),
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

		const deliveryPerson = await DeliveryPerson.destroy({
			where: {
				id: req.query.id,
			},
		});
		if (deliveryPerson > 0) {
			return res.status(200).json({
				delete: `Delivery person with id ${req.query.id} have been removed.`,
			});
		}
		// Server side or client mistake?
		const findDeliveryPerson = await DeliveryPerson.findByPk(req.query.id);
		if (findDeliveryPerson) {
			return res.status(500).json({ error: 'Unkown Error' });
		}
		return res
			.status(400)
			.json({ error: 'Delivery person id does not exist.' });
	}

	async deliveries(req, res) {
		const schema = Yup.object().shape({
			id: Yup.number().required(),
			delivered: Yup.boolean(),
			offset: Yup.number().transform((originalValue) =>
				originalValue <= 0 ? 1 : originalValue
			),
			limit: Yup.number().transform((originalValue) =>
				originalValue <= 0 ? 20 : originalValue
			),
		});
		const values = { ...req.params, ...req.query };
		if (!(await schema.isValid(values))) {
			return res.status(400).json({
				error: 'Error on the request data structure.',
			});
		}

		const { offset = 1, limit = 20 } = await schema.cast(req.query);
		const { delivered } = req.query;

		const deliveryPerson = await DeliveryPerson.findByPk(values.id);
		if (!deliveryPerson) {
			return res
				.status(400)
				.json({ error: 'Delivery person id not found.' });
		}

		const selectParams = {
			where: {
				deliveryperson_id: values.id,
				canceled_at: null,
			},
			limit,
			offset: (offset - 1) * limit,
			attributes: [
				'id',
				'created_at',
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
		};
		if (delivered !== undefined) {
			selectParams.where = {
				...selectParams.where,
				// delivered ? end_date not null : end_date: null
				end_date: delivered === 'true' ? { [Op.ne]: null } : null,
			};
		}
		const deliveryPack = await DeliveryPacks.findAll(selectParams);
		const count = await DeliveryPacks.count({
			where: selectParams.where
		});

		return res.json({
			deliveryPack,
			offset,
			limit,
			pages: Math.ceil(count/ limit),
		});
	}

	async signin(req, res) {
		const schema = Yup.object().shape({
			id: Yup.string(),
		});
		if (!(await schema.isValid(req.params))) {
			return res.status(400).json({
				error: 'offset and limit must be numbers.',
			});
		}

		const deliveryPerson = await DeliveryPerson.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ['id', 'name', 'email', 'avatar_id'],
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['name', 'path', 'url'],
				},
			],
		});

		if (!deliveryPerson) {
			return res
				.status(400)
				.json({ error: 'Delivery person id not found.' });
		}

		return res.json({
			deliveryPerson,
		});
	}
}

export default new DeliveryPersonController();
