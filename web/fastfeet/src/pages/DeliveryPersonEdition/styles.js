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
	background: ${(props) => (props.save ? '#7159c1' : '#cdcdcd')} !important;
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

export const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 30px 0px 20px 0px;

	div {
		display: flex;
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

	img {
		width: 90%;
	}

	label {
		text-align: left;
		font-weight: bold;
		color: #333;
	}

	input {
		width: 100%;
		background: transparent;
		border-radius: 4px;
		height: 44px;
		padding: 0 15px;
		color: #333;
		margin: 0 0 10px;
		border: 1px solid #cdcdcd;
		margin-top: 10px;

		&::placeholder {
			color: #999;
		}
	}

	span {
		color: #f64c75;
		align-self: flex-start;
		margin: 0 0 10px;
		font-weight: bold;
	}
`;
