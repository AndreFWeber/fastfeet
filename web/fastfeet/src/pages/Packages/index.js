import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdDelete, MdCreate, MdVisibility } from 'react-icons/md';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '../../services/history';
import OptionsButtons from '../../components/OptionsButtons';
import Paginator from '../../components/Paginator';
import SearchBarC from '../../components/Search';
import Modal from '../../components/Modal';
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
	Status,
	ViewModal,
	Hr,
	Signature,
	Pbold,
	Dates,
} from './styles';

export default function Packages() {
	const [packages, setPackages] = useState([]);
	const [offset, setOffset] = useState(1);
	const [pages, setPages] = useState(1);
	const [open, setOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [modalPack, setModalPack] = useState({});

	useEffect(() => {
		async function loadPackages() {
			try {
				const response = await api
					.get('deliverypackage', {
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
					const tmp = response.data.deliveryPack.map((pack) => {
						pack.status = '';
						if (pack.canceled_at) {
							pack.status = 'CANCELADA';
							pack.formatted_canceled_at = format(
								new Date(pack.canceled_at),
								"d'/'MM'/'YYY",
								{ locale: pt }
							);
						}
						if (pack.end_date) {
							if (pack.status === '') {
								pack.status = 'ENTREGUE';
							}
							pack.formatted_end_date = format(
								new Date(pack.end_date),
								"d'/'MM'/'YYY",
								{ locale: pt }
							);
						}
						if (pack.start_date) {
							if (pack.status === '') {
								pack.status = 'RETIRADA';
							}
							pack.formatted_start_date = format(
								new Date(pack.start_date),
								"d'/'MM'/'YYY",
								{ locale: pt }
							);
						}
						if (pack.status === '') {
							pack.status = 'PENDENTE';
						}

						return pack;
					});
					setPackages(tmp);
					setPages(response.data.pages);
				}
			} catch (error) {
				console.tron.log(
					'@DeliveryPersonEdition/handleSave Error',
					error
				);
			}
		}

		loadPackages();
	}, [offset, refresh]);

	function handleStore() {
		history.push('/new-deliverypackage', {
			title: 'Cadastro de encomendas',
		});
	}

	function handleViewButton(pack) {
		setModalPack(pack);
		setOpen(true);
	}

	function handleEditPackageButton(pack) {
		history.push('/new-deliverypackage', {
			title: 'Edição de encomendas',
			editPack: pack,
		});
	}

	function handlePaginate(p) {
		setOffset(p);
	}

	async function handleCancelPackageButton(pack) {
		console.tron.log('handleCancelPackageButton', pack);
		// eslint-disable-next-line no-alert
		const r = window.confirm('cancelar a encomenda?');
		if (r === true) {
			try {
				const response = await api
					.delete(`/deliverypackage/${pack.id}/cancel-delivery`)
					.catch((error) => {
						toast.error('Não foi possível cancelar a encomenda.');
						console.tron.log(
							'@Packages/handleCancelPackageButton Error',
							error
						);
					});
				if (response.status === 200) {
					toast.success('Encomenda cancelada com sucesso.');
					setRefresh(!refresh);
				}
			} catch (error) {
				console.tron.log(
					'@Packages/handleCancelPackageButton Error',
					error
				);
			}
		}
	}

	async function getSearchResults(opt) {
		try {
			const response = await api
				.get('deliverypackage', {
					params: { q: opt, offset: 1, limit: 10 },
				})
				.catch(() => {
					toast.error(
						'Não foi possível buscar as encomendas cadastradas.'
					);
				});
			if (response.status === 200) {
				const tmp = response.data.deliveryPack.map((pack) => {
					pack.status = '';
					if (pack.canceled_at) {
						pack.status = 'CANCELADA';
						pack.formatted_canceled_at = format(
							new Date(pack.canceled_at),
							"d'/'MM'/'YYY",
							{ locale: pt }
						);
					}
					if (pack.end_date) {
						if (pack.status === '') {
							pack.status = 'ENTREGUE';
						}
						pack.formatted_end_date = format(
							new Date(pack.end_date),
							"d'/'MM'/'YYY",
							{ locale: pt }
						);
					}
					if (pack.start_date) {
						if (pack.status === '') {
							pack.status = 'RETIRADA';
						}
						pack.formatted_start_date = format(
							new Date(pack.start_date),
							"d'/'MM'/'YYY",
							{ locale: pt }
						);
					}
					if (pack.status === '') {
						pack.status = 'PENDENTE';
					}

					return pack;
				});
				setPackages(tmp);
				setPages(response.data.pages);
			}
		} catch (error) {
			console.tron.log(
				'@getSelectPackagesOptions/handleSave Error',
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
						<strong>Informações da encomendas</strong>

						<p>{`${
							modalPack.recipient && modalPack.recipient.street
						}, ${
							modalPack.recipient && modalPack.recipient.number
						}`}</p>
						<p>{`${
							modalPack.recipient && modalPack.recipient.city
						} - ${
							modalPack.recipient && modalPack.recipient.state
						}`}</p>
						<p>
							{modalPack.recipient &&
								modalPack.recipient.postcode}
						</p>

						{(modalPack.formatted_canceled_at ||
							modalPack.formatted_start_date ||
							modalPack.formatted_end_date) && (
							<>
								<Hr />
								<strong>Datas</strong>
							</>
						)}
						{modalPack.formatted_canceled_at && (
							<Dates>
								<Pbold>Cancelamento:</Pbold>
								<p>{modalPack.formatted_canceled_at}</p>
							</Dates>
						)}
						{modalPack.formatted_start_date && (
							<Dates>
								<Pbold>Retirada:</Pbold>
								<p>{modalPack.formatted_start_date}</p>
							</Dates>
						)}
						{modalPack.formatted_end_date && (
							<Dates>
								<Pbold>Entrega:</Pbold>
								<p>{modalPack.formatted_end_date}</p>
							</Dates>
						)}
						{modalPack.signature && (
							<Signature>
								<Hr />
								<strong>
									{modalPack.signature &&
										'Assinatura do destinatário'}
								</strong>
								<img
									src={modalPack.signature.url}
									alt="signature"
								/>
							</Signature>
						)}
					</ViewModal>
				}
			/>
			<Header>
				<h1>Gerenciando encomendas</h1>
				<div>
					<SearchBarC
						getSearchResults={getSearchResults}
						placeholder="Buscar Encomendas"
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
			{packages.length > 0 && (
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
										#
										{pack.id < 10 ? `0${pack.id}` : pack.id}
									</Td>
									<Td>{pack.recipient.recipient}</Td>
									<AvatarContainer
										r={Math.floor(Math.random() * 255) + 1}
										g={Math.floor(Math.random() * 255) + 1}
										b={Math.floor(Math.random() * 255) + 1}
									>
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
												<MdVisibility
													color="#7159c1"
													size={15}
													style={{ margin: 10 }}
												/>,
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
												'Editar',
												'Cancelar Encomenda',
											]}
											cb={[
												() => {
													handleViewButton(pack);
												},
												() => {
													handleEditPackageButton(
														pack
													);
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
