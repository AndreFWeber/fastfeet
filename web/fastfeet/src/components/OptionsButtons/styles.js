import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
	position: relative;
`;
export const OpHeader = styled.button`
	background: none;
	border: 0;
	position: relative;
`;

export const TopList = styled.div`
	width: 100px;
	height: 100px;
	position: absolute;
	left: calc(-50% + 15px); //icon size 22
	top: calc(-175%);
	overflow: hidden;
	box-shadow: 0 16px 10px -17px rgba(0, 0, 0, 0.5);

	&::after {
		content: '';
		position: absolute;
		width: 50px;
		height: 50px;
		background: #fff;
		transform: rotate(45deg); /* Prefixes... */
		top: 75px;
		left: 25px;
		box-shadow: -1px -1px 10px -2px rgba(0, 0, 0, 0.5);
	}
`;
export const OpList = styled.div`
	position: absolute;
	width: 260px;
	left: calc(-100% - 11px); //icon size 22
	top: calc(10% + 30px);
	background: ${darken(0.04, '#fff')};
	border-radius: 4px;

	box-shadow: 0px 8px 10px gray, -10px 8px 15px gray, 10px 8px 15px gray;
	display: ${(props) => (props.visible ? 'flex' : 'none')};
	flex-direction: column;
	z-index: 1;

	&::before {
		content: '';
		position: absolute;
		left: calc(50% - 20px);
		top: -20px;
		width: 0;
		height: 0;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
		border-bottom: 20px solid ${darken(0.04, '#fff')};
	}
`;

export const Option = styled.button`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 64px;
	width: 100%;
	background: ${darken(0.04, '#fff')};
	font-weight: bold;
	color: #999;
	border: 0;
	border-radius: 4px;
	font-size: 16px;
	transition: background 0.2s;

	&:hover {
		background: ${darken(0.1, '#fff')};
	}
`;

export const Hr = styled.hr`
	width: 90%;
	margin: 0 5%;
	border: 0.5px solid ${lighten(0.3, '#999')};
`;
