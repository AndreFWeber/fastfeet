import Mail from '../../lib/Mail';

class NewPackageMail {
	get key() {
		return 'PackageCanceledMail';
	}

	async handle({ data }) {
		const { id, deliveryPerson } = data;

		await Mail.sendMail({
			to: `${deliveryPerson.name} <${deliveryPerson.email}>`,
			subject: `(#${id}) Package canceled`,
			template: 'packageCanceled',
			context: {
				packageId: id,
				deliveryPerson: deliveryPerson.name,
			},
		});
	}
}

export default new NewPackageMail();
