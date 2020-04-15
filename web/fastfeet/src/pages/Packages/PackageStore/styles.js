import styled from 'styled-components';
import { darken } from 'polished';
import selectArrow from '../../../assets/selectArrow.svg';

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
		color: rgb(78, 78, 78);
	}

	input {
		width: 100%;
		background: transparent;
		border-radius: 4px;
		height: 44px;
		padding: 0 15px;
		color: rgb(150, 150, 150);
		margin: 0 0 10px;
		border: 1px solid rgb(150, 150, 150, 0.5);
		margin-top: 10px;

		&::placeholder {
			color: rgb(150, 150, 150);
		}
	}

	span {
		color: #f64c75;
		align-self: flex-start;
		margin: 0 0 10px;
		font-weight: bold;
	}
`;

export const SelectContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export const Select = styled.div`
	margin-bottom: 15px;
	width: 49%;
	text-align: left;
	color: rgb(78, 78, 78);

	select {
		width: 100%;
		border-radius: 4px;
		position: relative;
		border: 1px solid rgb(150, 150, 150, 0.5);
		color: rgb(150, 150, 150);
		font-size: 16px;
		padding: 10px 26px 10px 12px;
		-moz-appearance: none; /* Firefox */
		-webkit-appearance: none; /* Safari and Chrome */
		appearance: none;
		background: url(${selectArrow}) no-repeat right #fff;
		background-position: 100% 50%;
		background-size: 6% auto;
	}
`;
