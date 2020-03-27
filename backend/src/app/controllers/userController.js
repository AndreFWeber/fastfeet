import * as Yup from 'yup';
import Users from '../models/Users';

class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
			admin: Yup.boolean().required(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error:
					'The fields name, email, password (6 characters) and admin are mandatory.',
			});
		}

		const user = await Users.findOne({
			where: { email: req.body.email },
		});
		if (user) {
			return res
				.status(400)
				.json({ error: 'User email already exists.' });
		}

		const { id, name, email, password, admin } = await Users.create(
			req.body
		);
		return res.json({
			id,
			name,
			email,
			password,
			admin,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			id: Yup.string().required(),
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string(),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
			admin: Yup.boolean(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'body validation failed.' });
		}

		const { email, oldPassword } = req.body;
		const user = await Users.findByPk(req.body.id);

		if (email && email !== user.email) {
			const userExists = await Users.findOne({
				where: { email: req.body.email },
			});
			if (userExists) {
				return res.status(400).json({ error: 'User already exist.' });
			}
		}
		console.log('USER ', req.userId);
		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match.' });
		}

		console.log('gonna update ', req.body);
		const { id, name, password, admin } = await user.update(req.body);

		console.log('did update ', req.body);
		return res.json({
			id,
			name,
			email,
			password,
			admin,
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

		const count = await Users.count({});
		const users = await Users.findAll({
			limit,
			offset: (offset - 1) * limit,
			attributes: ['id', 'name', 'email', 'admin'],
			order: ['id'],
		});

		return res.json({
			users,
			offset,
			limit,
			pages: Math.ceil(count / limit),
		});
	}
}

export default new UserController();
