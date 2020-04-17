/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
	Container,
	Wrapper,
	Content,
	Select,
	SelectContainer,
	SelectList,
} from './styles';
import ContentHeader from '../../../components/ContentHeader';
import history from '../../../services/history';
import api from '../../../services/api';

export default function PackageStore({ location }) {
	const [recipients, setRecipients] = useState([]);
	const [deliveryPeople, setDeliveryPeople] = useState([]);
	const [pack, setPack] = useState({
		recipient_id: -1,
		deliveryperson_id: -1,
		product: '',
	});

	async function handleSave() {
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

	async function handleUpdate() {
		if (pack.product === '') {
			toast.error('Todos os campos são obrigatórios.');
			return;
		}
		try {
			const data = {
				...pack,
				package_id: location.state.editPack.id,
			};
			const response = await api
				.put('/deliverypackage', data)
				.catch((error) => {
					toast.error('Não foi possível editar o usuário.');
					console.tron.log('@PackageStore/handleUpdate Error', error);
				});
			if (response.status === 200) {
				toast.success('Encomenda cadastrada com sucesso.');
			}
		} catch (error) {
			console.tron.log('@PackageStore/handleUpdate Error', error);
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
								recipient_id:
									(location.state.editPack &&
										location.state.editPack.recipient.id) ||
									response.data.recipients[0].id,
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
									(location.state.editPack &&
										location.state.editPack.deliveryperson
											.id) ||
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
		if (location.state.editPack) {
			setPack({
				...pack,
				product: location.state.editPack.product,
			});
		}
	}, []);

	return (
		<Container>
			<Wrapper>
				<ContentHeader
					title={location.state.title}
					returnCb={handleReturn}
					saveCb={() => {
						if (location.state.editPack) {
							handleUpdate();
						} else {
							handleSave();
						}
					}}
				/>
				<Content>
					<SelectContainer>
						<Select>
							<label htmlFor="">
								Destinatário
								<SelectList
									value={pack.recipient_id}
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
								</SelectList>
							</label>
						</Select>
						<Select>
							<label htmlFor="">
								Entregador
								<SelectList
									value={pack.deliveryperson_id}
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
								</SelectList>
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
