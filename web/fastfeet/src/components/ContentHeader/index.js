import React from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, Header, Button } from './styles';

export default function ContentHeader({ title, returnCb, saveCb }) {
	return (
		<Container>
			<Header>
				<h1>{title}</h1>
				<div>
					<Button
						onClick={() => {
							returnCb();
						}}
					>
						<MdChevronLeft
							color="#fff"
							size={25}
							style={{ margin: 1 }}
						/>
						Voltar
					</Button>
					<Button
						save
						onClick={() => {
							saveCb();
						}}
					>
						<MdCheck color="#fff" size={25} style={{ margin: 1 }} />
						Salvar
					</Button>
				</div>
			</Header>
		</Container>
	);
}
ContentHeader.propTypes = {
	title: PropTypes.string.isRequired,
	returnCb: PropTypes.func.isRequired,
	saveCb: PropTypes.func.isRequired,
};
