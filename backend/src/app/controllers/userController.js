import * as Yup from 'yup';
import Users from '../models/Users';

class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error:
					'The fields name, email and password (6 characters) are mandatory.',
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

		const { id, name, email, password } = await Users.create(req.body);
		return res.json({
			id,
			name,
			email,
			password,
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
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'body validation failed.' });
		}

		const { oldPassword } = req.body;
		const updatedEmail = req.body.email;

		const user = await Users.findByPk(req.body.id);
		if (!user) {
			return res.status(400).json({ error: 'User id not found.' });
		}

		if (updatedEmail && updatedEmail !== user.email) {
			const userExists = await Users.findOne({
				where: { email: updatedEmail },
			});
			if (userExists) {
				return res.status(400).json({ error: 'User already exist.' });
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match.' });
		}

		const { id, name, password, email } = await user.update(req.body);

		return res.json({
			id,
			name,
			email,
			password,
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
			attributes: ['id', 'name', 'email'],
			order: ['id'],
		});

		return res.json({
			users,
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

		const user = await Users.destroy({
			where: {
				id: req.query.id,
			},
		});
		if (user > 0) {
			return res.status(200).json({
				delete: `User with id ${req.query.id} have been removed.`,
			});
		}
		// Server side or client mistake?
		const findUser = await Users.findByPk(req.query.id);
		if (findUser) {
			return res.status(500).json({ error: 'Unkown Error' });
		}
		return res.status(400).json({ error: 'User id does not exist.' });
	}
}

export default new UserController();
