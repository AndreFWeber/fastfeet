/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Select, InputLabel } from '@material-ui/core';
import { Container, Wrapper, Content } from './styles';
import ContentHeader from '../../../components/ContentHeader';
import history from '../../../services/history';
import api from '../../../services/api';

export default function PackageStore() {
	const [fileId, setFileId] = useState(-1);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [recipient, setRecipient] = React.useState('');

	const handleChange = (event) => {
		setRecipient(event.target.recipient);
	};

	async function handleSave() {
		if (name === '' || email === '') {
			toast.error('Os campos de nome e e-email são obrigatórios.');
			return;
		}
		const data = {
			name,
			email,
		};
		if (fileId >= 0) data.avatar_id = fileId;

		try {
			const response = await api
				.post('deliveryperson', data)
				.catch((error) => {
					if (
						error.response.data.error.indexOf(
							'email already exists'
						)
					) {
						toast.error('Email já está cadastrado.');
					} else {
						toast.error('Não foi possível cadastrar o usuário.');
					}
				});

			if (response.status === 200) {
				toast.success('Usuário cadastrado com sucesso.');
			}
		} catch (error) {
			console.tron.log('@DeliveryPersonEdition/handleSave Error', error);
		}
	}

	function handleReturn() {
		history.push('/packages');
	}

	return (
		<Container>
			<Wrapper>
				<ContentHeader
					title="Cadastro de encomendas"
					returnCb={handleReturn}
					saveCb={handleSave}
				/>
				<Content>
					<InputLabel htmlFor="outlined-age-native-simple">
						Age
					</InputLabel>
					<Select
						native
						value={recipient}
						onChange={handleChange}
						label="Age"
						inputProps={{
							name: 'age',
							id: 'outlined-age-native-simple',
						}}
					>
						<option aria-label="None" value="" />
						<option value={10}>Ten</option>
						<option value={20}>Twenty</option>
						<option value={30}>Thirty</option>
					</Select>

					<label htmlFor="name">
						Nome
						<Input
							id="name"
							name="name"
							type="name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="Nome do entregador"
							accept="image/*"
						/>
					</label>
				</Content>
			</Wrapper>
		</Container>
	);
}
