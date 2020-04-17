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

export default function Problems() {
	const [packages, setPackages] = useState([]);
	const [offset, setOffset] = useState(1);
	const [pages, setPages] = useState(1);
	const [open, setOpen] = useState(false);
	const [modalPack, setModalPack] = useState({});
	const [search, setSearch] = useState('');

	useEffect(() => {
		async function loadPackages() {
			try {
				const response = await api
					.get('/deliverypackage/problems', {
						params: { offset, limit: 10 },
					})
					.catch((error) => {
						console.tron.log(
							'@Packages/loadPackages ',
							error.response.data.error
						);
						toast.error('Não foi possível buscar as encomendas.');
					});

				if (response.status === 200) {
					setPackages(response.data.deliveryProblems);
					setPages(response.data.pages);
				}
			} catch (error) {
				console.tron.log('@Problems/handleSave Error', error);
			}
		}

		loadPackages();
	}, [offset]);

	function handleViewButton(pack) {
		setModalPack(pack);
		setOpen(true);
	}

	function handlePaginate(p) {
		setOffset(p);
		console.tron.log('go to page', p);
	}

	async function handleCancelPackageButton(pack) {
		console.tron.log('handleCancelPackageButton', pack);
		try {
			const response = await api
				.delete(`/deliverypackage/${pack.delivery_id}/cancel-delivery`)
				.catch((error) => {
					toast.error('Não foi possível cancelar a encomenda.');
					console.tron.log(
						'@Packages/handleCancelPackageButton Error',
						error
					);
				});
			if (response.status === 200) {
				toast.success('Encomenda cancelada com sucesso.');
			}
		} catch (error) {
			console.tron.log(
				'@Packages/handleCancelPackageButton Error',
				error
			);
		}
	}

	return (
		<Container>
			<Modal
				openn={open}
				onClose={() => {
					setOpen(false);
				}}
				child={
					<ViewModal>
						<strong>Visualizar Problema</strong>
						<p>{modalPack.description}</p>
					</ViewModal>
				}
			/>
			<Header>
				<h1>Problemas na entrega</h1>
				<div>
					<Search>
						<MdSearch
							style={{ marginLeft: '1rem', position: 'absolute' }}
							color="rgb(150, 150, 150)"
							size="1.5em"
						/>
						<SearchBar
							id="searchBar"
							name="searchBar"
							type="search"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							placeholder="Buscar por entregadores"
						/>
					</Search>
				</div>
			</Header>
			{packages.length > 0 && (
				<Table>
					<thead>
						<tr>
							<Th>Encomenda</Th>
							<Th>Problema</Th>
							<Th>Ações</Th>
						</tr>
					</thead>
					<tbody>
						{packages &&
							packages.map((pack) => (
								<Tr key={pack.id}>
									<Td>
										<p>
											#
											{pack.id < 10
												? `0${pack.id}`
												: pack.id}
										</p>
									</Td>
									<Td>
										<p>{pack.description}</p>
									</Td>
									<Td>
										<OptionsButtons
											icon={[
												<MdVisibility
													color="#7159c1"
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
													handleCancelPackageButton(
														pack
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
