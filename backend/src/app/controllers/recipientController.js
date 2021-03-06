import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipients from '../models/Recipients';

class RecipientController {
	async store(req, res) {
		const schema = Yup.object().shape({
			recipient: Yup.string().required(),
			street: Yup.string().required(),
			number: Yup.number().required(),
			complement: Yup.string(),
			state: Yup.string().required(),
			city: Yup.string().required(),
			postcode: Yup.string().required(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error:
					'The fields recipient, street, number, state, city and postcode are mandatory.',
			});
		}

		// I may have two or more recipients on a same addres.
		// So I wont check for duplicates.

		const {
			id,
			recipient,
			street,
			number,
			complement,
			state,
			city,
			postcode,
		} = await Recipients.create(req.body);

		return res.json({
			id,
			recipient,
			street,
			number,
			complement,
			state,
			city,
			postcode,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			id: Yup.string().required(),
			recipient: Yup.string(),
			street: Yup.string(),
			number: Yup.number(),
			complement: Yup.string(),
			state: Yup.string(),
			city: Yup.string(),
			postcode: Yup.string(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'body validation failed.' });
		}

		const db_recipient = await Recipients.findByPk(req.body.id);
		if (!db_recipient) {
			return res.status(400).json({ error: 'Recipient id not found.' });
		}

		const {
			id,
			recipient,
			street,
			number,
			complement,
			state,
			city,
			postcode,
		} = await db_recipient.update(req.body);

		return res.json({
			id,
			recipient,
			street,
			number,
			complement,
			state,
			city,
			postcode,
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

		const count = await Recipients.count({
			where: {
				recipient: {
					[Op.iLike]: `%${req.query.q || ''}%`,
				},
			},
		});
		const recipients = await Recipients.findAll({
			where: {
				recipient: {
					[Op.iLike]: `%${req.query.q || ''}%`,
				},
			},
			limit,
			offset: (offset - 1) * limit,
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
			order: ['id'],
		});

		return res.json({
			recipients,
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

		const user = await Recipients.destroy({
			where: {
				id: req.query.id,
			},
		});
		if (user > 0) {
			return res.status(200).json({
				delete: `Recipient with id ${req.query.id} have been removed.`,
			});
		}
		// Server side or client mistake?
		const findRecipeint = await Recipients.findByPk(req.query.id);
		if (findRecipeint) {
			return res.status(500).json({ error: 'Unkown Error' });
		}
		return res.status(400).json({ error: 'Recipient id does not exist.' });
	}
}

export default new RecipientController();
