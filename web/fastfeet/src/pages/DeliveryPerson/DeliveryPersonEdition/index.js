/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Container, Wrapper, Content } from './styles';
import AvatarInput from './AvatarInput';
import history from '../../../services/history';
import api from '../../../services/api';
import ContentHeader from '../../../components/ContentHeader';

export default function DeliveryPersonEdition({ location }) {
	const [fileId, setFileId] = useState(-1);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const param = location.state;

	useEffect(() => {
		if (param.editDeliveryPerson) {
			setName(param.editDeliveryPerson.name);
			setEmail(param.editDeliveryPerson.email);
		}
	}, [param]);

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
			toast.error('Não foi possível cadastrar o usuário. Verifique sua conexão.');
			console.tron.log('@DeliveryPersonEdition/handleSave Error', error);
		}
	}

	async function handleUpdate() {
		if (name === '' || email === '') {
			toast.error('Os campos de nome e e-email são obrigatórios.');
			return;
		}
		const data = {
			name,
			email,
			id: param.editDeliveryPerson.id,
		};
		if (fileId >= 0) data.avatar_id = fileId;

		try {
			const response = await api
				.put('deliveryperson', data)
				.catch((error) => {
					if (
						error.response.data.error.indexOf(
							'email already exists'
						)
					) {
						toast.error('Email já está cadastrado.');
					} else {
						toast.error('Não foi possível atualizar o usuário.');
					}
				});

			if (response.status === 200) {
				toast.success('Usuário atualizado com sucesso.');
			}
		} catch (error) {
			toast.error('Não foi possível editar o usuário. Verifique sua conexão.');
			console.tron.log(
				'@DeliveryPersonEdition/handleUpdate Error',
				error
			);
		}
	}

	function handleReturn() {
		history.push('/deliveryperson');
	}

	return (
		<Container>
			<Wrapper>
				<ContentHeader
					title={param.title}
					returnCb={handleReturn}
					saveCb={() => {
						if (param.editDeliveryPerson) handleUpdate();
						else handleSave();
					}}
				/>
				<Content>
					<AvatarInput
						name="avatar_id"
						setFileId={setFileId}
						previewUrl={
							param.editDeliveryPerson &&
							param.editDeliveryPerson.avatar &&
							param.editDeliveryPerson.avatar.url
						}
					/>
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

DeliveryPersonEdition.propTypes = {
	location: PropTypes.shape.isRequired,
};
