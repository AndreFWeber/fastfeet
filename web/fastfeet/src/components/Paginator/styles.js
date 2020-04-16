import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Button = styled.button.attrs(({ disabled }) => ({
	disabled,
}))`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px;
	height: 34px;
	width: 120px;
	background: #7159c1;
	font-weight: bold;
	color: #fff;
	border: 0;
	border-radius: 4px;
	font-size: 16px;
	transition: background 0.2s;
	opacity: ${(props) => (props.disabled ? 0.3 : 1)};

	&:hover {
		background: ${darken(0.06, '#7159c1')};
	}
`;
