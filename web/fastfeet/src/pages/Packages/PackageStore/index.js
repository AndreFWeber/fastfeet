/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Container, Wrapper, Content, Select, SelectContainer } from './styles';
import ContentHeader from '../../../components/ContentHeader';
import history from '../../../services/history';
import api from '../../../services/api';

export default function PackageStore() {
	const [recipients, setRecipients] = useState([]);
	const [deliveryPeople, setDeliveryPeople] = useState([]);
	const [pack, setPack] = useState({
		recipient_id: -1,
		deliveryperson_id: -1,
		product: '',
	});

	async function handleSave() {
		console.tron.log(' SAVE ', pack);
		if (pack.product === '') {
			toast.error('Todos os campos são obrigatórios.');
			return;
		}
		try {
			const response = await api
				.post('/deliverypackage', {
					...pack,
				})
				.catch((error) => {
					toast.error('Não foi possível cadastrar o usuário.');
					console.tron.log('@PackageStore/handleSave Error', error);
				});
			if (response.status === 200) {
				toast.success('Encomenda cadastrada com sucesso.');
			}
		} catch (error) {
			console.tron.log('@PackageStore/handleSave Error', error);
		}
	}

	function handleReturn() {
		history.push('/packages');
	}

	useEffect(() => {
		async function loadRecipients() {
			try {
				const response = await api.get('recipient').catch((error) => {
					toast.error('Não foi buscar os destinatários cadastrados.');
				});
				if (response.status === 200) {
					if (response.data.recipients.length) {
						setRecipients(response.data.recipients);
						setPack((p) => {
							return {
								...p,
								recipient_id: response.data.recipients[0].id,
							};
						});
					}
				}
			} catch (error) {
				console.tron.log('@PackageStore/handleSave Error', error);
			}
		}
		async function loadDeliveryPeople() {
			try {
				const response = await api
					.get('deliveryperson')
					.catch((error) => {
						toast.error(
							'Não foi buscar os entregadores cadastrados.'
						);
					});
				if (response.status === 200) {
					if (response.data.deliveryPerson.length) {
						setDeliveryPeople(response.data.deliveryPerson);
						setPack((p) => {
							return {
								...p,
								deliveryperson_id:
									response.data.deliveryPerson[0].id,
							};
						});
					}
				}
			} catch (error) {
				console.tron.log('@loadDeliveryPeople/handleSave Error', error);
			}
		}
		loadRecipients();
		loadDeliveryPeople();
	}, []);

	return (
		<Container>
			<Wrapper>
				<ContentHeader
					title="Cadastro de encomendas"
					returnCb={handleReturn}
					saveCb={handleSave}
				/>
				<Content>
					<SelectContainer>
						<Select>
							<label htmlFor="">
								Destinatário
								<select
									id="recipients"
									onChange={(e) => {
										setPack({
											...pack,
											recipient_id: e.target.value,
										});
									}}
								>
									{recipients &&
										recipients.map((recipient) => (
											<option
												value={recipient.id}
												key={recipient.id}
											>
												{recipient.recipient}
											</option>
										))}
								</select>
							</label>
						</Select>
						<Select>
							<label htmlFor="">
								Entregador
								<select
									id="deliveryPerson"
									onChange={(e) => {
										console.tron.log(
											'CHANGE ',
											e.target.value
										);
										setPack({
											...pack,
											deliveryperson_id: e.target.value,
										});
									}}
								>
									{deliveryPeople &&
										deliveryPeople.map((deliveryPerson) => (
											<option
												value={deliveryPerson.id}
												key={deliveryPerson.id}
											>
												{`${deliveryPerson.name} (${deliveryPerson.email})`}
											</option>
										))}
								</select>
							</label>
						</Select>
					</SelectContainer>
					<label htmlFor="product">
						Nome do produto
						<Input
							id="product"
							name="product"
							type="product"
							value={pack.product}
							onChange={(e) => {
								setPack({
									...pack,
									product: e.target.value,
								});
							}}
							placeholder="Nome do produto"
						/>
					</label>
				</Content>
			</Wrapper>
		</Container>
	);
}
