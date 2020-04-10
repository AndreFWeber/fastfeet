import * as Yup from 'yup';
import DeliveryPacks from '../models/DeliveryPacks';
import DeliveryPerson from '../models/DeliveryPerson';
import DeliveryProblems from '../models/DeliveryProblems';
import PackageCancelledMail from '../jobs/PackageCancelledMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
	async store(req, res) {
		const schema = Yup.object().shape({
			id: Yup.number().required(),
			description: Yup.string().required(),
		});
		const values = { ...req.params, ...req.body };
		if (!(await schema.isValid(values))) {
			return res.status(400).json({
				error: 'The fields package_id, and description are mandatory.',
			});
		}

		const pack = await DeliveryPacks.findByPk(values.id);
		if (!pack) {
			return res.status(400).json({ error: 'Package id not found.' });
		}

		const existingProblem = await DeliveryProblems.findOne({
			where: { delivery_id: values.id },
		});

		const sqlizeBody = {
			delivery_id: values.id,
			description: values.description,
		};
		let sqlizeResp;

		if (existingProblem) {
			sqlizeResp = await existingProblem.update(sqlizeBody);
		} else {
			sqlizeResp = await DeliveryProblems.create(sqlizeBody);
		}
		return res.json({
			id: sqlizeResp.id,
			package_id: sqlizeResp.delivery_id,
			description: sqlizeResp.description,
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
		});
		if (!(await schema.isValid(req.query))) {
			return res.status(400).json({
				error: 'offset and limit must be numbers.',
			});
		}
		const { offset = 1, limit = 20 } = await schema.cast(req.query);

		const count = await DeliveryProblems.count({});
		const deliveryProblems = await DeliveryProblems.findAll({
			limit,
			offset: (offset - 1) * limit,
			attributes: ['id', 'delivery_id', 'description'],
		});

		return res.json({
			deliveryProblems,
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
			return res.status(400).json({
				error: 'The fields package_id, and description are mandatory.',
			});
		}

		const found = await DeliveryProblems.findOne({
			where: {
				delivery_id: req.params.id,
			},
			attributes: ['id', 'delivery_id', 'description'],
		});
		if (!found) {
			return res.status(400).json({ error: 'Package id not found.' });
		}
		const { id, delivery_id, description } = found;
		return res.json({ id, delivery_id, description });
	}

	async delete(req, res) {
		const schema = Yup.object().shape({
			id: Yup.number().required(),
		});
		if (!(await schema.isValid(req.params))) {
			return res.status(400).json({
				error: 'The fields parsed are not correct.',
			});
		}
		const pack = await DeliveryPacks.findByPk(req.params.id);
		if (!pack) {
			return res.status(400).json({ error: 'Package id not found.' });
		}

		const deliveryPerson = await DeliveryPerson.findByPk(
			pack.deliveryperson_id
		);
		if (deliveryPerson) {
			await Queue.add(PackageCancelledMail.key, {
				id: req.params.id,
				deliveryPerson,
			});
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
		} = await pack.update({ canceled_at: new Date() });

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
}

export default new DeliveryProblemsController();
