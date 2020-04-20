import styled from 'styled-components';

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
		color: rgb(78, 78, 78);
		margin: 0 0 10px;
		border: 1px solid rgb(150, 150, 150);
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
