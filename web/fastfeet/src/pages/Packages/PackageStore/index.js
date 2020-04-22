/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ASelect from '../../../components/ASelect';
import { Container, Wrapper, Content, StyledForm } from './styles';
import ContentHeader from '../../../components/ContentHeader';
import history from '../../../services/history';
import api from '../../../services/api';

const colourStyles = {
	container: (styles) => ({
		...styles,
		width: '100%',
		paddingTop: 15,
		color: 'rgb(150, 150, 150)',
	}),
	control: (styles) => ({
		...styles,
		backgroundColor: 'transparent',
		height: '44px',
		fontWeight: '100',
	}),
	input: (styles) => ({
		...styles,
		color: 'rgb(150, 150, 150)',
	}),
	placeholder: (styles) => ({
		...styles,
		color: 'rgb(150, 150, 150)',
	}),
	singleValue: (styles) => ({
		...styles,
		color: 'rgb(150, 150, 150)',
	}),
};

export default function PackageStore({ location }) {
	const formRef = useRef(null);
	const [pack, setPack] = useState({
		recipient_id: -1,
		deliveryperson_id: -1,
		product: '',
	});
	const param = location.state;

	useEffect(() => {
		if (param.editPack) {
			setPack((p) => {
				return {
					...p,
					product: param.editPack.product,
					recipient_id: param.editPack.recipient.id,
					deliveryperson_id: param.editPack.deliveryperson.id,
				};
			});
		}
	}, [param.editPack]);

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
				package_id: param.editPack.id,
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

	async function getSelectRecipientsOptions(opt, callback) {
		try {
			const response = await api
				.get('recipient', { params: { q: opt } })
				.catch(() => {
					toast.error(
						'Não foi possível buscar os destinatários cadastrados.'
					);
				});
			if (response.status === 200) {
				const opts = response.data.recipients.map((recipient) => ({
					value: recipient.id,
					label: recipient.recipient,
				}));
				callback(opts);
			}
		} catch (error) {
			console.tron.log(
				'@PackageStore/getSelectRecipientsOptions Error',
				error
			);
		}
	}

	async function getSelectDeliveryPeopleOptions(opt, callback) {
		try {
			const response = await api
				.get('deliveryperson', { params: { q: opt } })
				.catch(() => {
					toast.error(
						'Não foi possível buscar os entregadores cadastrados.'
					);
				});
			if (response.status === 200) {
				const opts = response.data.deliveryPerson.map((person) => ({
					value: person.id,
					label: person.name,
				}));
				callback(opts);
			}
		} catch (error) {
			console.tron.log(
				'@PackageStore/getSelectDeliveryPeopleOptions Error',
				error
			);
		}
	}

	return (
		<Container>
			<Wrapper>
				<ContentHeader
					title={param.title}
					returnCb={handleReturn}
					saveCb={() => {
						if (param.editPack) {
							handleUpdate();
						} else {
							handleSave();
						}
					}}
				/>
				<Content>
					<StyledForm ref={formRef}>
						<label htmlFor="entregador">
							Destinatário
							<ASelect
								type="text"
								name="recipient_id"
								loadOptions={getSelectRecipientsOptions}
								styles={colourStyles}
								placeholder={
									// Couldnt use it properly...setting a value :/
									param.editPack
										? param.editPack.recipient.recipient
										: 'Destinatários'
								}
								noOptionsMessage={() =>
									'Nenhum destinatário encontrado'
								}
								onChange={(v) => {
									setPack((p) => ({
										...p,
										recipient_id: v.value,
									}));
								}}
							/>
						</label>
						<label htmlFor="entregador">
							Entregador
							<ASelect
								type="text"
								name="deliveryperson_id"
								loadOptions={getSelectDeliveryPeopleOptions}
								placeholder={
									// Couldnt use it properly...setting a value :/
									param.editPack
										? param.editPack.deliveryperson.name
										: 'Entregadores'
								}
								styles={colourStyles}
								noOptionsMessage={() =>
									'Nenhum entregador encontrado'
								}
								onChange={(v) => {
									setPack((p) => ({
										...p,
										deliveryperson_id: v.value,
									}));
								}}
							/>
						</label>
					</StyledForm>
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

PackageStore.propTypes = {
	location: PropTypes.shape.isRequired,
};
