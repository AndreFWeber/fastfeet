/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import Select from 'react-select/async';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

const ASelect = ({ name, ...rest }) => {
	const selectRef = useRef(null);
	const { fieldName, defaultValue, registerField } = useField(name);

	useEffect(() => {
		console.tron.log('use effect', fieldName, defaultValue, registerField);
		registerField({
			name: fieldName,
			ref: selectRef.current,
			path: 'select.state.value',
			getValue: (ref) => {
				if (rest.isMulti) {
					if (!ref.select.state.value) {
						return [];
					}

					return ref.select.state.value.map((option) => option.value);
				}
				if (!ref.select.state.value) {
					console.tron.log(
						'use effect',
						fieldName,
						defaultValue,
						registerField
					);
					return '';
				}

				return ref.select.state.value.value;
			},
		});
	}, [fieldName, registerField, defaultValue, rest.isMulti]);

	return (
		<Select
			cacheOptions
			ref={selectRef}
			classNamePrefix="react-select"
			{...rest}
		/>
	);
};
export default ASelect;

ASelect.propTypes = {
	name: PropTypes.string.isRequired,
};
