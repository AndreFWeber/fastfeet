import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdDelete, MdCreate } from 'react-icons/md';
import history from '../../services/history';
import OptionsButtons from '../../components/OptionsButtons';
import Paginator from '../../components/Paginator';
import SearchBarC from '../../components/Search';
import api from '../../services/api';

import { Container, Header, Button, Table, Th, Tr, Td } from './styles';

export default function Recipients() {
	const [recipients, setRecipients] = useState([]);
	const [offset, setOffset] = useState(1);
	const [pages, setPages] = useState(1);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		async function loadRecipients() {
			try {
				const response = await api
					.get('recipient', {
						params: { offset, limit: 10 },
					})
					.catch((error) => {
						console.tron.log(
							'@Recipients/loadRecipients ',
							error.response.data.error
						);
						toast.error('Não foi possível buscar as encomendas.');
					});

				if (response.status === 200) {
					setRecipients(response.data.recipients);
					setPages(response.data.pages);
				}
			} catch (error) {
				console.tron.log('@Recipients/loadRecipients Error', error);
			}
		}

		loadRecipients();
	}, [offset, refresh]);

	async function getSearchResults(opt) {
		try {
			const response = await api
				.get('recipient', {
					params: { q: opt, offset: 1, limit: 10 },
				})
				.catch(() => {
					toast.error(
						'Não foi possível buscar os destinatários cadastrados.'
					);
				});
			if (response.status === 200) {
				setRecipients(response.data.recipients);
				setPages(response.data.pages);
			}
		} catch (error) {
			console.tron.log('@Recipients/getSearchResults Error', error);
		}
	}

	function handleStore() {
		history.push('/new-recipient', {
			title: 'Cadastro de destinatários',
		});
	}

	function handleEditRecipientButton(recipient) {
		history.push('/new-recipient', {
			title: 'Edição de destinatário',
			editRecipient: recipient,
		});
	}

	function handlePaginate(p) {
		setOffset(p);
	}

	async function handleRemoveRecipientButton(recipient) {
		// eslint-disable-next-line no-alert
		const r = window.confirm('Remover o destinatário?');
		if (r === true) {
			try {
				const response = await api
					.delete(`/recipient`, { params: { id: recipient.id } })
					.catch((error) => {
						toast.error('Não foi possível excluir o destinatário.');
						console.tron.log(
							'@Recipients/handleRemoveRecipientButton Error',
							error
						);
					});
				if (response.status === 200) {
					toast.success('Destinatário excluído com sucesso.');
					setRefresh(!refresh);
				}
			} catch (error) {
				console.tron.log(
					'@Recipients/handleRemoveRecipientButton Error',
					error
				);
			}
		}
	}

	return (
		<Container>
			<Header>
				<h1>Gerenciando destinatários</h1>
				<div>
					<SearchBarC
						getSearchResults={getSearchResults}
						placeholder="Buscar destinatários"
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
			{recipients.length > 0 && (
				<Table>
					<thead>
						<tr>
							<Th>ID</Th>
							<Th>Nome</Th>
							<Th>Endreço</Th>
							<Th>Ações</Th>
						</tr>
					</thead>
					<tbody>
						{recipients &&
							recipients.map((recipient) => (
								<Tr key={recipient.id}>
									<Td>
										#
										{recipient.id < 10
											? `0${recipient.id}`
											: recipient.id}
									</Td>
									<Td>{recipient.recipient}</Td>
									<Td>{`${recipient.street}, ${
										recipient.number
									} ${
										recipient.complement !== null
											? `, ${recipient.complement}, `
											: ', '
									} ${recipient.city} -  ${
										recipient.state
									} `}</Td>
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
													handleEditRecipientButton(
														recipient
													);
												},
												() => {
													handleRemoveRecipientButton(
														recipient
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
