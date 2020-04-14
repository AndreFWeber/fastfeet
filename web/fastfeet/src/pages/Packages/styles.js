/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Table = styled.table`
	width: 80%;
	margin: 0 10%;
	border-collapse: separate;
	border-spacing: 0 20px;
`;

export const Th = styled.th`
	color: rgb(78, 78, 78);
`;

export const Tr = styled.tr`
	width: 100%;
	background: #fff;
	height: 50px;
`;

export const Td = styled.td`
	text-align: center;
	border: none;
	color: rgb(150, 150, 150);
`;

export const Status = styled.div`
	background: ${(props) =>
		props.status === 'CANCELADA'
			? 'rgb(215, 62, 66, 0.3)'
			: props.status === 'ENTREGUE'
			? 'rgb(63, 165, 42, 0.3)'
			: props.status === 'RETIRADA'
			? 'rgb(85, 127, 238, 0.3)'
			: 'rgb(191, 189, 54, 0.3)'};

	width: 80%;
	margin: 0 10%;
	height: 25px;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;

	strong {
		font-weight: bold;
		color: ${(props) =>
			props.status === 'CANCELADA'
				? 'rgb(215, 62, 66)'
				: props.status === 'ENTREGUE'
				? 'rgb(63, 165, 42)'
				: props.status === 'RETIRADA'
				? 'rgb(85, 127, 238)'
				: 'rgb(191, 189, 54)'};
	}

	&::before {
		content: '';
		display: inline-block;
		width: 8px;
		height: 8px;
		margin-right: 5px;
		background: ${(props) =>
			props.status === 'CANCELADA'
				? 'rgb(215, 62, 66)'
				: props.status === 'ENTREGUE'
				? 'rgb(63, 165, 42)'
				: props.status === 'RETIRADA'
				? 'rgb(85, 127, 238)'
				: 'rgb(191, 189, 54)'};
		border-radius: 50%;
	}
`;
