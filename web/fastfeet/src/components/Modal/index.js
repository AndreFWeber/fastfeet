import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

export default function CModal({ openn, child, onClose, onOpen }) {
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		console.log('OPEJ ', openn);
		setOpen(openn);
	}, [openn]);

	// const handleOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

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
