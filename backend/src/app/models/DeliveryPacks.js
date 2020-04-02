import Sequelize, { Model } from 'sequelize';

class DeliveryPacks extends Model {
	static init(sequelize) {
		super.init(
			{
				recipient_id: Sequelize.INTEGER,
				deliveryperson_id: Sequelize.INTEGER,
				signature_id: Sequelize.INTEGER,
				product: Sequelize.STRING,
				canceled_at: Sequelize.DATE,
				start_date: Sequelize.DATE,
				end_date: Sequelize.DATE,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Recipients, {
			foreignKey: 'recipient_id',
			as: 'recipient',
		});
		this.belongsTo(models.DeliveryPerson, {
			foreignKey: 'deliveryperson_id',
			as: 'deliveryperson',
		});
		this.belongsTo(models.File, {
			foreignKey: 'signature_id',
			as: 'signature',
		});
	}
}

export default DeliveryPacks;
