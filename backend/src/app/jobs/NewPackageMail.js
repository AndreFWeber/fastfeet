import Mail from '../../lib/Mail';

class NewPackageMail {
	get key() {
		return 'NewPackageMail';
	}

	async handle({ data }) {
		const { id, deliveryPerson, recipient } = data;

		await Mail.sendMail({
			to: `${deliveryPerson.name} <${deliveryPerson.email}>`,
			subject: `(#${id}) New package for collection`,
			template: 'newPackage',
			context: {
				packageId: id,
				deliveryPerson: deliveryPerson.name,
				recipientName: recipient.recipient,
				recipientStreet: recipient.street,
				recipientNumber: recipient.number,
				recipientComplement: recipient.complement,
				recipientState: recipient.state,
				recipientCity: recipient.city,
				recipientPostcode: recipient.postcode,
			},
		});
	}
}

export default new NewPackageMail();
