import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
	static init(sequelize) {
		super.init(
			{
				recipient: Sequelize.STRING,
				street: Sequelize.STRING,
				number: Sequelize.INTEGER,
				complement: Sequelize.STRING,
				state: Sequelize.STRING,
				city: Sequelize.STRING,
				postcode: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);
	}
}

export default Recipients;
