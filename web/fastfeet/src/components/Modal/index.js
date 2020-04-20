import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

export default function CModal({ openn, child, onClose }) {
	const classes = useStyles();

	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openn}
				onClose={onClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openn}>{child}</Fade>
			</Modal>
		</>
	);
}

CModal.propTypes = {
	openn: PropTypes.bool.isRequired,
	child: PropTypes.element.isRequired,
	onClose: PropTypes.func.isRequired,
};
