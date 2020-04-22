import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdDelete, MdVisibility } from 'react-icons/md';
import SearchBarC from '../../components/Search';
import OptionsButtons from '../../components/OptionsButtons';
import Paginator from '../../components/Paginator';
import Modal from '../../components/Modal';
import api from '../../services/api';

import { Container, Header, Table, Th, Tr, Td, ViewModal } from './styles';

export default function Problems() {
	const [packages, setPackages] = useState([]);
	const [offset, setOffset] = useState(1);
	const [pages, setPages] = useState(1);
	const [open, setOpen] = useState(false);
	const [modalPack, setModalPack] = useState({});

	useEffect(() => {
		async function loadPackages() {
			try {
				const response = await api
					.get('/deliverypackage/problems', {
						params: { offset, limit: 10 },
					})
					.catch((error) => {
						console.tron.log(
							'@Problems/loadPackages ',
							error.response.data.error
						);
						toast.error('Não foi possível buscar as encomendas.');
					});

				if (response.status === 200) {
					setPackages(response.data.deliveryProblems);
					setPages(response.data.pages);
				}
			} catch (error) {
				console.tron.log('@Problems/loadPackages Error', error);
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
	}

	async function handleCancelPackageButton(pack) {
		// eslint-disable-next-line no-alert
		const r = window.confirm('Cancelar a encomenda?');
		if (r === true) {
			try {
				const response = await api
					.delete(
						`/deliverypackage/${pack.delivery_id}/cancel-delivery`
					)
					.catch((error) => {
						toast.error('Não foi possível cancelar a encomenda.');
						console.tron.log(
							'@Problems/handleCancelPackageButton Error',
							error
						);
					});
				if (response.status === 200) {
					toast.success('Encomenda cancelada com sucesso.');
				}
			} catch (error) {
				console.tron.log(
					'@Problems/handleCancelPackageButton Error',
					error
				);
			}
		}
	}

	async function getSearchResults(opt) {
		try {
			const query = opt
				? `/deliverypackage/${opt}/problems`
				: '/deliverypackage/problems';
			console.tron.log(opt, query);
			const response = await api
				.get(query, {
					params: { offset: 1, limit: 10 },
				})
				.catch((error) => {
					if (error.message.indexOf('400')) {
						setPackages([]);
						setPages(0);
					} else {
						toast.error(
							'Não foi possível buscar os destinatários cadastrados.'
						);
					}
				});
			if (response.status === 200) {
				if (opt) setPackages([response.data]);
				else setPackages(response.data.deliveryProblems);
				setPages(response.data.pages);
			}
		} catch (error) {
			console.tron.log('@Problems/getSearchResults Error', error);
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
					<SearchBarC
						getSearchResults={getSearchResults}
						placeholder="Buscar Encomendas"
					/>
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
