import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
	height: 100%;
	background: linear-gradient(180deg, #7159c1, #ab87b5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 315px;
	text-align: center;
	background: #fff;
	padding: 65px 25px;
	border-radius: 10px;

	img {
		width: 90%;
	}

	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;

		label {
			text-align: left;
			font-weight: bold;
			color: rgb(91, 87, 87);
		}

		input {
			width: 100%;
			background: rgba(0, 0, 0, 0.1);
			border: 0;
			border-radius: 4px;
			height: 44px;
			padding: 0 15px;
			color: #2c2a2af;
			margin: 0 0 10px;

			&::placeholder {
				color: rgb(155, 151, 151);
			}
		}

		span {
			color: #f64c75;
			align-self: flex-start;
			margin: 0 0 10px;
			font-weight: bold;
		}

		button {
			margin: 5px 0 0;
			height: 44px;
			background: #7159c1;
			font-weight: bold;
			color: #fff;
			border: 0;
			border-radius: 4px;
			font-size: 16px;
			transition: background 0.2s;

			&:hover {
				background: ${darken(0.03, '#3b9eff')};
			}
		}
	}
`;
