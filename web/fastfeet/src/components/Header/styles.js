import styled from 'styled-components';

export const Container = styled.div`
	background: #fff;
	padding: 0 30px;
`;

export const Content = styled.div`
	height: 64px;

	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;

		img {
			margin-right: 20px;
			padding-right: 20px;
			border-right: 1px solid #eee;
			width: 200px;
		}
	}

	aside {
		display: flex;
		align-items: center;
	}
`;

export const LinkContainer = styled.div`
	a {
		font-weight: bold;
		color: ${(props) => (props.linkActive ? '#333' : '#999')} !important;
		margin-right: 50px;
	}
`;

export const Profile = styled.div`
	display: flex;
	margin-left: 20px;
	padding-left: 20px;
	border-left: 1px solid #eee;
	flex-direction: column;
	text-align: right;
	margin-right: 10px;
	justify-content: space-evenly;
	height: 64px;

	strong {
		display: block;
		color: #333;
	}

	button {
		display: block;
		font-size: 12px;
		color: #f64c75;
		background: transparent;
		border: none;
		font-weight: bold;
	}
`;
