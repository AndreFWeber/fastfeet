import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdInsertPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container } from './styles';
import api from '../../../services/api';

export default function AvatarInput({ setFileId }) {
	const { defaultValue, registerField } = useField('avatar');
	const [file, setFile] = useState(defaultValue && defaultValue.id);
	const [preview, setPreview] = useState(defaultValue && defaultValue.url);
	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			registerField({
				name: 'avatar_id',
				ref: ref.current,
				path: 'dataset.file',
			});
		}
	}, [ref, registerField]);

	async function handleChange(e) {
		const data = new FormData();

		data.append('file', e.target.files[0]);

		const response = await api.post('files', data);

		const { id, url } = response.data;

		setFile(id);
		setFileId(id);
		setPreview(url);
	}
	return (
		<Container>
			<label htmlFor="avatar">
				{preview ? (
					<img src={preview} alt="avatar" />
				) : (
					<div>
						<MdInsertPhoto size={35} />
						Adicionar Foto
					</div>
				)}
				<input
					type="file"
					id="avatar"
					accept="image/*"
					data-file={file}
					onChange={handleChange}
					ref={ref}
				/>
			</label>
		</Container>
	);
}

AvatarInput.propTypes = {
	setFileId: PropTypes.func.isRequired,
};
