import React from 'react';
import history from '../../services/history';
// import { Container } from './styles';

export default function DeliveryPerson() {
	function handleNew() {
		history.push('/new-deliveryperson');
	}

	return (
		<>
			<h1>DeliveryPerson</h1>{' '}
			<button
				type="button"
				onClick={() => {
					handleNew();
				}}
			>
				Cadastrar
			</button>
		</>
	);
}
