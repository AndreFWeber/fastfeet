import Sequelize from 'sequelize';
import User from '../app/models/Users';
import Recipients from '../app/models/Recipients';
import File from '../app/models/File';
import DeliveryPerson from '../app/models/DeliveryPerson';

import databaseConfig from '../config/database';

const models = [File, User, Recipients, DeliveryPerson];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models.map((model) => {
			model.init(this.connection);
			if (model && model.associate)
				model.associate(this.connection.models);

			return model;
		});
	}
}

export default new Database();
