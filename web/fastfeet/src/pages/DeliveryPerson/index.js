import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
	MdAdd,
	MdSearch,
	MdDelete,
	MdCreate,
	MdVisibility,
} from 'react-icons/md';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '../../services/history';
import OptionsButtons from '../../components/OptionsButtons';
import Paginator from '../../components/Paginator';
import Modal from '../../components/Modal';
import api from '../../services/api';

import {
	Container,
	Header,
	Search,
	SearchBar,
	Button,
	Table,
	Th,
	Tr,
	Td,
	AvatarContainer,
	Status,
	ViewModal,
	Hr,
	Signature,
	Pbold,
	Dates,
} from './styles';

export default function DeliveryPerson() {
	const [deliveryPeople, setDeliveryPeople] = useState([]);
	const [offset, setOffset] = useState(1);
	const [pages, setPages] = useState(1);
	const [email, setEmail] = useState('');

	useEffect(() => {
		async function loadDeliveryPerson() {
			try {
				const response = await api
					.get('deliveryperson', {
						params: { offset, limit: 10 },
					})
					.catch((error) => {
						console.tron.log(
							'@Packages/loadDeliveryPerson ',
							error.response.data.error
						);
						toast.error('Não foi possível buscar as encomendas.');
					});

				if (response.status === 200) {
					console.log(response.data.deliveryPerson);
					setDeliveryPeople(response.data.deliveryPerson);
					setPages(response.data.pages);
				}
			} catch (error) {
				console.tron.log(
					'@DeliveryPersonEdition/handleSave Error',
					error
				);
			}
		}

		loadDeliveryPerson();
	}, [offset]);

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

	function handlePaginate(p) {
		setOffset(p);
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
						toast.error('Não foi possível excluir o entragador.');
						console.tron.log(
							'@Packages/handleRemoveDeliveryPersonButton Error',
							error
						);
					});
				if (response.status === 200) {
					toast.success('Entregador removido com sucesso.');
				}
			} catch (error) {
				console.tron.log(
					'@Packages/handleRemoveDeliveryPersonButton Error',
					error
				);
			}
		}
	}

	return (
		<Container>
			<Header>
				<h1>Gerenciando entregadores</h1>
				<div>
					<Search>
						<MdSearch
							style={{ marginLeft: '1rem', position: 'absolute' }}
							color="rgb(150, 150, 150)"
							size="1.5em"
						/>
						<SearchBar
							id="email"
							name="email"
							type="search"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="Buscar por entregadores"
						/>
					</Search>
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
				<Paginator
					pages={pages}
					onPaginate={(p) => handlePaginate(p)}
				/>
			)}
		</Container>
	);
}
