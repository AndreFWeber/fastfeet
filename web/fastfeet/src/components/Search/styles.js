import styled from 'styled-components';

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
