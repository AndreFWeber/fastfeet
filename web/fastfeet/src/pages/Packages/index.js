import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container, List } from './styles';

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
					console.tron.log(response.data);
					// response.data.map((d) => console.log('fsdfdsa', d));
					setPackages(response.data.deliveryPack);
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
		<List>
			{packages &&
				packages.map((pack) => (
					<li key={pack.id}>
						<span>{pack.id}</span>
						<span>{pack.product}</span>
						<span>{pack.deliveryperson.name}</span>
						<span>{pack.recipient.city}</span>
						<span>{pack.recipient.state}</span>
						{/* <span>status</span> */}
					</li>
				))}
		</List>
	);
}
