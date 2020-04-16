import React, { useState, useMemo } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import PropTypes from 'prop-types';
import {
	HugeCloseInvisibleButton,
	OpHeader,
	OpList,
	Option,
	Hr,
	Container,
} from './styles';

export default function OptionsButtons({ icon, title, cb }) {
	const [visible, setVisible] = useState(false);

	function toggleVisible() {
		setVisible(!visible);
	}

	return (
		<>
			<HugeCloseInvisibleButton
				visible={visible}
				onClick={toggleVisible}
			/>
			<Container>
				<OpHeader visible={visible} onClick={toggleVisible}>
					<MdMoreHoriz size={22} color="rgb(150, 150, 150)" />
				</OpHeader>
				<OpList visible={visible}>
					{title.map((t, index) => (
						<div key={title[index]}>
							<Option
								onClick={() => {
									cb[index]();
									setVisible(!visible);
								}}
							>
								{icon[index]}
								{title[index]}
							</Option>
							<Hr />
						</div>
					))}
				</OpList>
			</Container>
		</>
	);
}
OptionsButtons.propTypes = {
	title: PropTypes.arrayOf(PropTypes.string).isRequired,
	icon: PropTypes.arrayOf(PropTypes.element).isRequired,
	cb: PropTypes.arrayOf(PropTypes.func).isRequired,
};
