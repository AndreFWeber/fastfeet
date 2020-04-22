import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdDelete, MdCreate } from 'react-icons/md';
import history from '../../services/history';
import OptionsButtons from '../../components/OptionsButtons';
import Paginator from '../../components/Paginator';
import SearchBarC from '../../components/Search';
import api from '../../services/api';
import {
	Container,
	Header,
	Button,
	Table,
	Th,
	Tr,
	Td,
	AvatarContainer,
} from './styles';

export default function DeliveryPerson() {
	const [deliveryPeople, setDeliveryPeople] = useState([]);
	const [offset, setOffset] = useState(1);
	const [pages, setPages] = useState(1);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		async function loadDeliveryPerson() {
			try {
				const response = await api
					.get('deliveryperson', {
						params: { offset, limit: 10 },
					})
					.catch((error) => {
						console.tron.log(
							'@DeliveryPerson/loadDeliveryPerson ',
							error.response.data.error
						);
						toast.error('Não foi possível buscar as encomendas.');
					});

				if (response.status === 200) {
					setDeliveryPeople(response.data.deliveryPerson);
					setPages(response.data.pages);
				}
			} catch (error) {
				console.tron.log(
					'@DeliveryPerson/loadDeliveryPerson Error',
					error
				);
			}
		}

		loadDeliveryPerson();
	}, [offset, refresh]);

	function handleStore() {
		history.push('/new-deliveryperson', {
			title: 'Cadastro de entregadores',
		});
	}

	function handleDeliveryPersonButton(selectedDeliveryPerson) {
		history.push('/new-deliveryperson', {
			title: 'Edição de entregadores',
			editDeliveryPerson: selectedDeliveryPerson,
		});
	}

	async function handleRemoveDeliveryPersonButton(selectedDeliveryPerson) {
		// eslint-disable-next-line no-alert
		const r = window.confirm('Remover o entregador?');
		if (r === true) {
			try {
				const response = await api
					.delete(`/deliveryperson`, {
						params: { id: selectedDeliveryPerson.id },
					})
					.catch((error) => {
						toast.error('Não foi possível excluir o entregador.');
						console.tron.log(
							'@DeliveryPerson/handleRemoveDeliveryPersonButton Error',
							error
						);
					});
				if (response.status === 200) {
					toast.success('Entregador removido com sucesso.');
					setRefresh(!refresh);
				}
			} catch (error) {
				console.tron.log(
					'@DeliveryPerson/handleRemoveDeliveryPersonButton Error',
					error
				);
			}
		}
	}

	async function getSearchResults(opt) {
		try {
			const response = await api
				.get('deliveryperson', {
					params: { q: opt, offset: 1, limit: 10 },
				})
				.catch(() => {
					toast.error(
						'Não foi possível buscar os entregadores cadastradas.'
					);
				});
			if (response.status === 200) {
				setDeliveryPeople(response.data.deliveryPerson);
				setPages(response.data.pages);
			}
		} catch (error) {
			console.tron.log('@DeliveryPerson/getSearchResults Error', error);
		}
	}

	return (
		<Container>
			<Header>
				<h1>Gerenciando entregadores</h1>
				<div>
					<SearchBarC
						getSearchResults={getSearchResults}
						placeholder="Buscar Entregadores"
					/>
					<Button
						type="button"
						save
						onClick={() => {
							handleStore();
						}}
					>
						<MdAdd color="#fff" size={25} style={{ margin: 1 }} />
						Cadastrar
					</Button>
				</div>
			</Header>
			{deliveryPeople.length > 0 && (
				<Table>
					<thead>
						<tr>
							<Th>ID</Th>
							<Th>Foto</Th>
							<Th>Nome</Th>
							<Th>Email</Th>
							<Th>Ações</Th>
						</tr>
					</thead>
					<tbody>
						{deliveryPeople &&
							deliveryPeople.map((selectedDeliveryPerson) => (
								<Tr key={selectedDeliveryPerson.id}>
									<Td>
										#
										{selectedDeliveryPerson.id < 10
											? `0${selectedDeliveryPerson.id}`
											: selectedDeliveryPerson.id}
									</Td>
									<AvatarContainer
										r={Math.floor(Math.random() * 255) + 1}
										g={Math.floor(Math.random() * 255) + 1}
										b={Math.floor(Math.random() * 255) + 1}
									>
										{selectedDeliveryPerson.avatar ? (
											<img
												src={
													selectedDeliveryPerson
														.avatar.url
												}
												alt="avatar"
											/>
										) : (
											<div>
												{selectedDeliveryPerson.name
													.split(' ')
													.map(
														(n, i) => i < 2 && n[0]
													)}
											</div>
										)}
									</AvatarContainer>
									<Td>{selectedDeliveryPerson.name}</Td>
									<Td>{selectedDeliveryPerson.email}</Td>
									<Td>
										<OptionsButtons
											icon={[
												<MdCreate
													color="blue"
													size={15}
													style={{ margin: 10 }}
												/>,
												<MdDelete
													color="red"
													size={15}
													style={{ margin: 10 }}
												/>,
											]}
											title={['Editar', 'Excluir']}
											cb={[
												() => {
													handleDeliveryPersonButton(
														selectedDeliveryPerson
													);
												},
												() => {
													handleRemoveDeliveryPersonButton(
														selectedDeliveryPerson
													);
												},
											]}
										/>
									</Td>
								</Tr>
							))}
					</tbody>
				</Table>
			)}
			{pages > 0 && (
				<Paginator pages={pages} onPaginate={(p) => setOffset(p)} />
			)}
		</Container>
	);
}
