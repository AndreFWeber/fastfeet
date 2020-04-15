import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
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
		background: ${(props) =>
			darken(0.06, props.save ? '#7159c1' : '#cdcdcd')};
	}
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 30px 0px 20px 0px;
	color: rgb(78, 78, 78);

	div {
		display: flex;
	}
`;
