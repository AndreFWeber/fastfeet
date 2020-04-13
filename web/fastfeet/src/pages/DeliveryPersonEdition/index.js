/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Wrapper, Content, Header, Button } from './styles';
import AvatarInput from './AvatarInput';
import history from '../../services/history';
import api from '../../services/api';

export default function DeliveryPersonEdition() {
	const [fileId, setFileId] = useState(-1);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

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
		history.push('/deliveryperson');
	}

	return (
		<Container>
			<Wrapper>
				<Header>
					<h1>Cadastro de entragadores</h1>
					<div>
						<Button
							type="button"
							onClick={() => {
								handleReturn();
							}}
						>
							<MdChevronLeft
								color="#fff"
								size={25}
								style={{ margin: 1 }}
							/>
							Voltar
						</Button>
						<Button
							type="button"
							save
							onClick={() => {
								handleSave();
							}}
						>
							<MdCheck
								color="#fff"
								size={25}
								style={{ margin: 1 }}
							/>
							Salvar
						</Button>
					</div>
				</Header>
				<Content>
					<AvatarInput name="avatar_id" setFileId={setFileId} />
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
					<br />
					<label htmlFor="email">
						E-mail
						<Input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="E-mail do entregador"
						/>
					</label>
				</Content>
			</Wrapper>
		</Container>
	);
}
