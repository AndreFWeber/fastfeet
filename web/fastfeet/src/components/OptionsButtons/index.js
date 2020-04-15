import React, { useState, useMemo } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import PropTypes from 'prop-types';
import { OpHeader, OpList, Option, Hr, Container } from './styles';

export default function OptionsButtons({ icon, title, cb }) {
	const [visible, setVisible] = useState(false);

	function toggleVisible() {
		setVisible(!visible);
	}

	// const options = useMemo(() => {
	// 	for (let i = 0; i < icon.length; i++)
	// 		return { icon: icon[i], title: title[i], cb: cb[i] };
	// }, [icon, title, cb]);

	return (
		<Container>
			<OpHeader onClick={toggleVisible}>
				<MdMoreHoriz size={22} color="rgb(150, 150, 150)" />
			</OpHeader>
			<OpList visible={visible}>
				{title.map((t, index) => (
					<>
						<Option onClick={cb[index]}>
							{icon[index]}
							{title[index]}
						</Option>
						<Hr />
					</>
				))}
			</OpList>
		</Container>
	);
}
OptionsButtons.propTypes = {
	title: PropTypes.arrayOf(PropTypes.string).isRequired,
	icon: PropTypes.arrayOf(PropTypes.element).isRequired,
	cb: PropTypes.arrayOf(PropTypes.func).isRequired,
};
