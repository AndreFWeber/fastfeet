/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import {
	Container,
	Wrapper,
	Content,
	InputContainer,
	StyledInput,
} from './styles';
import ContentHeader from '../../../components/ContentHeader';
import history from '../../../services/history';
import api from '../../../services/api';

export default function RecipientStore({ location }) {
	const [recipients, setRecipients] = useState({
		recipient: '',
		street: '',
		number: '',
		complement: '',
		state: '',
		city: '',
		postcode: '',
	});
	const param = location.state;

	useEffect(() => {
		if (param.editRecipient) {
			setRecipients((r) => ({ ...r, ...param.editRecipient }));
		}
	}, [param.editRecipient]);

	async function handleSave() {
		const data = { ...recipients };
		if (data.complement === '') {
			delete data.complement;
		}
		try {
			const response = await api
				.post('/recipient', { ...data })
				.catch((error) => {
					toast.error('Não foi possível cadastrar o destinatário.');
					console.tron.log('@RecipientStore/handleSave Error', error);
				});
			if (response.status === 200) {
				toast.success('Destinatário cadastrado com sucesso.');
			}
		} catch (error) {
			console.tron.log('@RecipientStore/handleSave Error', error);
		}
	}

	async function handleUpdate() {
		if (recipients.product === '') {
			toast.error('Todos os campos são obrigatórios.');
			return;
		}
		try {
			const data = {
				...recipients,
				id: param.editRecipient.id,
			};
			const response = await api
				.put('/recipient', data)
				.catch((error) => {
					toast.error('Não foi possível editar o usuário.');
					console.tron.log(
						'@RecipientStore/handleUpdate Error',
						error
					);
				});
			if (response.status === 200) {
				toast.success('Encomenda cadastrada com sucesso.');
			}
		} catch (error) {
			console.tron.log('@RecipientStore/handleUpdate Error', error);
		}
	}

	function handleReturn() {
		history.push('/recipients');
	}

	useEffect(() => {}, []);

	return (
		<Container>
			<Wrapper>
				<ContentHeader
					title={param.title}
					returnCb={handleReturn}
					saveCb={() => {
						if (param.editRecipient) {
							handleUpdate();
						} else {
							handleSave();
						}
					}}
				/>
				<Content>
					<StyledInput>
						<label htmlFor="name">
							Nome
							<Input
								id="name"
								name="name"
								type="name"
								value={recipients.recipient}
								onChange={(e) => {
									setRecipients({
										...recipients,
										recipient: e.target.value,
									});
								}}
								placeholder="Nome"
							/>
						</label>
					</StyledInput>
					<InputContainer>
						<StyledInput width="70%">
							<label htmlFor="street">
								Rua
								<Input
									id="street"
									name="street"
									type="street"
									value={recipients.street}
									onChange={(e) => {
										setRecipients({
											...recipients,
											street: e.target.value,
										});
									}}
									placeholder="Rua"
								/>
							</label>
						</StyledInput>
						<StyledInput width="15%">
							<label htmlFor="number">
								Número
								<Input
									id="number"
									name="number"
									type="text"
									value={recipients.number}
									onChange={(e) => {
										setRecipients({
											...recipients,
											number: e.target.value,
										});
									}}
									placeholder="Número"
								/>
							</label>
						</StyledInput>
						<StyledInput width="15%">
							<label htmlFor="complement">
								Complemento
								<Input
									id="complement"
									name="complement"
									type="text"
									value={recipients.complement}
									onChange={(e) => {
										setRecipients({
											...recipients,
											complement: e.target.value,
										});
									}}
									placeholder="Complemento"
								/>
							</label>
						</StyledInput>
					</InputContainer>
					<InputContainer>
						<StyledInput width="33%">
							<label htmlFor="city">
								Cidade
								<Input
									id="city"
									name="city"
									type="city"
									value={recipients.city}
									onChange={(e) => {
										setRecipients({
											...recipients,
											city: e.target.value,
										});
									}}
									placeholder="Cidade"
								/>
							</label>
						</StyledInput>
						<StyledInput width="33%">
							<label htmlFor="state">
								Estado
								<Input
									id="state"
									name="state"
									type="state"
									value={recipients.state}
									onChange={(e) => {
										setRecipients({
											...recipients,
											state: e.target.value,
										});
									}}
									placeholder="Estado"
								/>
							</label>
						</StyledInput>
						<StyledInput width="33%">
							<label htmlFor="postcode">
								CEP
								<Input
									id="postcode"
									name="postcode"
									type="postcode"
									value={recipients.postcode}
									onChange={(e) => {
										setRecipients({
											...recipients,
											postcode: e.target.value,
										});
									}}
									placeholder="CEP"
								/>
							</label>
						</StyledInput>
					</InputContainer>
				</Content>
			</Wrapper>
		</Container>
	);
}

RecipientStore.propTypes = {
	location: PropTypes.string.isRequired,
};
