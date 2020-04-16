import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, Button } from './styles';

export default function Paginator({ pages, onPaginate }) {
	const [page, setPage] = useState(1);

	function handlePaginate(opt) {
		onPaginate(page + opt);
		setPage(page + opt);
	}

	return (
		<Container>
			<Button
				onClick={() => {
					handlePaginate(-1);
				}}
				disabled={page === 1}
			>
				<MdChevronLeft color="#fff" size={25} style={{ margin: 1 }} />
				Anterior
			</Button>
			<p>{`${page} de ${pages}`}</p>
			<Button
				onClick={() => {
					handlePaginate(1);
				}}
				disabled={pages === 1 || page >= pages}
			>
				Próximo
				<MdChevronRight color="#fff" size={25} style={{ margin: 1 }} />
			</Button>
		</Container>
	);
}
Paginator.propTypes = {
	pages: PropTypes.number.isRequired,
	onPaginate: PropTypes.func.isRequired,
};
