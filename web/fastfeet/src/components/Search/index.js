import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Search, SearchBar } from './styles';

export default function SearchBarC({ placeholder, getSearchResults }) {
	const [search, setSeach] = useState('');

	return (
		<Search>
			<MdSearch
				style={{ marginLeft: '1rem', position: 'absolute' }}
				color="rgb(150, 150, 150)"
				size="1.5em"
			/>
			<SearchBar
				id="search"
				name="search"
				type="search"
				value={search}
				onChange={(e) => {
					setSeach(e.target.value);
					getSearchResults(e.target.value);
				}}
				placeholder={placeholder}
			/>
		</Search>
	);
}
SearchBarC.propTypes = {
	placeholder: PropTypes.string.isRequired,
	getSearchResults: PropTypes.func.isRequired,
};
