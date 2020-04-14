import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MdMoreHoriz } from 'react-icons/md';
import api from '../../services/api';
import { Table, Th, Tr, Td, Status } from './styles';

export default function Packages() {
	const [packages, setPackages] = useState([]);
	const [offset, setOffset] = useState(1);

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
						toast.error('Não foi possível cadastrar o usuário.');
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

	return (
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
							<Td>#{pack.id < 10 ? `0${pack.id}` : pack.id}</Td>
							<Td>{pack.product}</Td>
							<Td>{pack.deliveryperson.name}</Td>
							<Td>{pack.recipient.city}</Td>
							<Td>{pack.recipient.state}</Td>
							<Td>
								<Status status={pack.status}>
									<strong>{pack.status}</strong>
								</Status>
							</Td>
							<Td>
								<MdMoreHoriz
									size={22}
									color="rgb(150, 150, 150)"
								/>
							</Td>
						</Tr>
					))}
			</tbody>
		</Table>
	);
}
