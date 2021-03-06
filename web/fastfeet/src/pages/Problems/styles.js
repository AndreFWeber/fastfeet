import styled from 'styled-components';

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
	max-width: 100%;
	background: #fff;
	height: 50px;
`;

export const Td = styled.td`
	text-align: left;
	border: none;
	color: rgb(150, 150, 150);
	padding: 10px;
	max-width: 500px;
	width: auto;

	p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const ViewModal = styled.div`
	width: 50%;
	padding: 30px;
	background-color: #fff;
	border-radius: 4px;

	strong {
		text-align: left;
		border: none;
		color: rgb(78, 78, 78);
	}

	p {
		margin: 5px 0px;
		color: rgb(150, 150, 150);
	}
`;
