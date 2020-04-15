import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdDelete, MdCreate } from 'react-icons/md';
import history from '../../services/history';
import OptionsButtons from '../../components/OptionsButtons';
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
} from './styles';

export default function Packages() {
	const [packages, setPackages] = useState([]);
	const [offset, setOffset] = useState(1);
	const [email, setEmail] = useState('');

	useEffect(() => {
		async function loadPackages() {
			try {
				const response = await api
					.get('deliverypackage')
					.catch((error) => {
						console.tron.log(
							'@Packages/loadPackages ',
							error.response.data.error
						);
						toast.error('Não foi possível buscar as encomendas.');
					});

				if (response.status === 200) {
					const tmp = response.data.deliveryPack.map((pack) => {
						if (pack.canceled_at) {
							pack.status = 'CANCELADA';
						} else if (pack.end_date) {
							pack.status = 'ENTREGUE';
						} else if (pack.start_date) {
							pack.status = 'RETIRADA';
						} else {
							pack.status = 'PENDENTE';
						}
						return pack;
					});
					setPackages(tmp);
				}
			} catch (error) {
				console.tron.log(
					'@DeliveryPersonEdition/handleSave Error',
					error
				);
			}
		}

		loadPackages();
	}, []);

	function handleSave() {}

	function handleStore() {
		history.push('/new-deliverypackage');
	}

	function handleViewButton(pack) {
		console.tron.log('handleViewButton', pack);
	}
	function handleCancelPackageButton(pack) {
		console.tron.log('handleCancelPackageButton', pack);
	}
	return (
		<Container>
			<Header>
				<h1>Gerenciando encomendas</h1>
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
			<Table>
				<thead>
					<tr>
						<Th>ID</Th>
						<Th>Destinatário</Th>
						<Th>Entregador</Th>
						<Th>Cidade</Th>
						<Th>Estado</Th>
						<Th>Status</Th>
						<Th>Ações</Th>
					</tr>
				</thead>
				<tbody>
					{packages &&
						packages.map((pack) => (
							<Tr key={pack.id}>
								<Td>
									#{pack.id < 10 ? `0${pack.id}` : pack.id}
								</Td>
								<Td>{pack.recipient.recipient}</Td>
								<Td
									r={Math.floor(Math.random() * 255) + 1}
									g={Math.floor(Math.random() * 255) + 1}
									b={Math.floor(Math.random() * 255) + 1}
								>
									<AvatarContainer>
										{pack.deliveryperson.avatar ? (
											<img
												src={
													pack.deliveryperson.avatar
														.url
												}
												alt="avatar"
											/>
										) : (
											<div>
												{pack.deliveryperson.name
													.split(' ')
													.map(
														(n, i) => i < 2 && n[0]
													)}
											</div>
										)}
										{pack.deliveryperson.name}
									</AvatarContainer>
								</Td>
								<Td>{pack.recipient.city}</Td>
								<Td>{pack.recipient.state}</Td>
								<Td>
									<Status status={pack.status}>
										<strong>{pack.status}</strong>
									</Status>
								</Td>
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
										title={[
											'Visualizar',
											'Cancelar Encomenda',
										]}
										cb={[
											() => {
												handleViewButton(pack);
											},
											() => {
												handleCancelPackageButton(pack);
											},
										]}
									/>
								</Td>
							</Tr>
						))}
				</tbody>
			</Table>
		</Container>
	);
}
