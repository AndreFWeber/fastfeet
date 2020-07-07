import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class DeliveryPerson extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				avatar_id: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
	}
}

export default DeliveryPerson;
