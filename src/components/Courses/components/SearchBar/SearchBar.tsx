import { Dispatch, SetStateAction } from 'react';

import { SEARCH, SEARCH_PLACEHOLDER } from 'constants/constants';

import Input from 'common/Input/Input';

type SearchBarProps = {
	setSubstring: Dispatch<SetStateAction<unknown>>;
	substring: string;
};

const SearchBar = ({ setSubstring, substring }: SearchBarProps) => {
	const handleChange = (event) => {
		const userInput = event.target.value;
		setSubstring(userInput.toLowerCase());
	};

	return (
		<Input
			labelText={SEARCH}
			value={substring}
			placeholder={SEARCH_PLACEHOLDER}
			onChange={handleChange}
		/>
	);
};

export default SearchBar;
