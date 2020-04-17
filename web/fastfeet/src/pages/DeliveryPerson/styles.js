/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px 0;
	background: #f5f5f5;
`;

export const Header = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;

	h1 {
		color: rgb(78, 78, 78);
	}

	div {
		padding: 30px 0px 15px 0px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

export const Search = styled.div`
	padding: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
`;

export const SearchBar = styled.input`
	padding: 1rem 1rem 1rem 3.5rem;
	width: 250px;
	height: 34px;
	color: rgb(78, 78, 78);
	background: #fff;

	&::placeholder {
		color: rgb(150, 150, 150);
	}
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px;
	height: 34px;
	width: 130px;
	background: #7159c1;
	font-weight: bold;
	color: #fff;
	border: 0;
	border-radius: 4px;
	font-size: 16px;
	transition: background 0.2s;

	&:hover {
		background: ${darken(0.06, '#7159c1')};
	}
`;

export const Table = styled.table`
	width: 80%;
	margin: 0 10%;
	border-collapse: separate;
	border-spacing: 0 20px;
`;

export const Th = styled.th`
	color: rgb(78, 78, 78);
	text-align: left;
	padding: 10px;
`;

export const Tr = styled.tr`
	width: 100%;
	background: #fff;
	height: 50px;
`;

export const AvatarContainer = styled.td`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-align: left;
	border: none;
	color: rgb(150, 150, 150);
	padding: 10px;

	img {
		margin-right: 5px;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		border: 3px solid rgba(255, 255, 255, 0.3);
		background: #eee;
	}

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 5px;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		border: 3px solid rgba(255, 255, 255, 0.3);
		--bg-color: ${(props) => `rgb(${props.r},${props.g}, ${props.b}, 0.2)`};
		--color: ${(props) => `rgb(${props.r},${props.g}, ${props.b}, 1)`};
		background: var(--bg-color);
		color: var(--color);
	}
`;

export const Td = styled.td`
	text-align: left;
	border: none;
	color: rgb(150, 150, 150);
	padding: 10px;
`;

export const Hr = styled.hr`
	width: 90%;
	margin: 10px 5%;
	border: 0.5px solid ${lighten(0.3, '#999')};
`;