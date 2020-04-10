import Sequelize, { Model } from 'sequelize';

class DeliveryProblems extends Model {
	static init(sequelize) {
		super.init(
			{
				delivery_id: Sequelize.INTEGER,
				description: Sequelize.TEXT,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.DeliveryPacks, {
			foreignKey: 'delivery_id',
			as: 'delivery',
		});
	}
}

export default DeliveryProblems;
