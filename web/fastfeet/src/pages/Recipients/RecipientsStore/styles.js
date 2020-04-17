import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	display: flex;
	justify-content: center;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 60%;
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px;
	height: 34px;
	width: 100px;
	background: ${(props) => (props.save ? '#7159c1' : '#cdcdcd')};
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

export const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export const StyledInput = styled.div`
	width: ${(props) => props.width};
	padding: 5px;
	display: flex;

	label {
		width: 100%;
		text-align: left;
		font-weight: bold;
		color: rgb(78, 78, 78);
	}

	input {
		width: 100%;
		background: transparent;
		border-radius: 4px;
		height: 44px;
		color: rgb(150, 150, 150);
		margin: 10px 0 10px;
		border: 1px solid rgb(150, 150, 150, 0.5);
		padding: 0 15px;

		&::placeholder {
			color: rgb(150, 150, 150);
			margin-left: 15px;
		}
	}
`;

export const Content = styled.div`
	text-align: center;
	background: #fff;
	padding: 65px 25px;
	border-radius: 10px;
	width: 100%;
	display: flex;
	flex-direction: column;
`;
