import React, { Dispatch, SetStateAction, useState } from 'react';

import { SEARCH, SEARCH_PLACEHOLDER } from 'constants.js';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';

type SearchBarProps = {
	setCourses: Dispatch<SetStateAction<unknown>>;
	courses: Course[];
};

type Course = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

const SearchBar = ({ setCourses, courses }: SearchBarProps) => {
	const [allCourses, setAllCourses] = useState(courses);
	const [substring, setSubstring] = useState('');

	const handleSearch = () => {
		const fileteredCourses = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(substring) ||
				course.id.toLowerCase().includes(substring)
		);
		setAllCourses(courses);
		setCourses(fileteredCourses);
	};

	const handleChange = (event) => {
		const userInput = event.target.value;
		setSubstring(userInput.toLowerCase());
		if (!userInput.length) setCourses(allCourses);
	};

	return (
		<>
			<Input
				labelText={SEARCH}
				value={substring}
				placeholder={SEARCH_PLACEHOLDER}
				handleChange={handleChange}
			/>
			<Button text={SEARCH} handleButtonClick={handleSearch} />
		</>
	);
};

export default SearchBar;
