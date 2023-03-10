import React, { useState, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
	mockedAuthorsList,
	CREATE_COURSE,
	TITLE,
	DESCRIPTION,
	ADD_AUTHOR,
	DELETE_AUTHOR,
	AUTHORS,
	DURATION,
	COURSE_AUTHORS,
	EMPTY_AUTHORS,
	TITLE_PLACEHOLDER,
	DESCR_PLACEHOLDER,
	DURATION_PLACEHOLDER,
	CREATE_AUTHOR,
	AUTHOR_NAME,
	AUTHOR_PLACEHOLDER,
	COURSE_ERROR,
	INVALID_SUMBOLS,
	DEFAULT_HOURS,
} from '../../constants.js';

import styles from './CreateCourse.module.css';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { Form, Row, Col, FormGroup, List } from 'reactstrap';

import formatCreationDate from '../../helpers/formatCreationDate.js';
import formatDuration from '../../helpers/formatDuration';

type NewCourseProps = {
	addCourse: Dispatch<SetStateAction<unknown>>;
	addAuthor: Dispatch<SetStateAction<unknown>>;
	setIsFormVisible: Dispatch<SetStateAction<unknown>>;
};

type Course = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

type Author = {
	id: string;
	name: string;
};

const defaultFields = {
	id: '',
	title: '',
	description: '',
	creationDate: formatCreationDate(),
	duration: 0,
	authors: [],
};

const CreateCourse = ({
	addCourse,
	addAuthor,
	setIsFormVisible,
}: NewCourseProps) => {
	const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
	const [authorName, setAuthorName] = useState('');
	const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
	const [courseDuration, setCourseDuration] = useState(0);
	const [duration, setDuration] = useState('');
	const [formatedDuration, setformatedDuration] = useState(DEFAULT_HOURS);
	const [courseDetails, setCourseDetails] = useState<Course>({
		...defaultFields,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (!INVALID_SUMBOLS.test(value) && value.length > 1) {
			setCourseDetails((prevState) => {
				return {
					...prevState,
					[name]: value,
				};
			});
		}
	};

	const handleDuration = (event) => {
		const value = event.target.value;
		const duration = +value;
		if (!isNaN(duration)) {
			setCourseDuration(duration);
			setDuration(value);
			setformatedDuration(formatDuration(duration));
		}
	};

	const handleAuthorDelete = (event) => {
		const authorId = event.target.name;
		setAuthors((prevState) => [
			...prevState,
			...courseAuthors.filter((author) => author.id === authorId),
		]);
		setCourseAuthors(courseAuthors.filter((author) => author.id != authorId));
	};

	const handleAuthorCreate = () => {
		if (!INVALID_SUMBOLS.test(authorName) && authorName.length > 1) {
			setAuthors((prevState) => [
				...prevState,
				{ id: uuidv4(), name: authorName },
			]);
		}
		setAuthorName('');
	};

	const handleAuthorAdd = (event) => {
		const authorId = event.target.name;
		setCourseAuthors((prevState) => [
			...prevState,
			...authors.filter((author) => author.id === authorId),
		]);
		setAuthors(authors.filter((author) => author.id != authorId));
	};

	const validateFields = (formFields: Course) => {
		return Object.entries(formFields).filter(
			([, value]) =>
				(typeof value != 'number' && value.length > 0) ||
				(typeof value === 'number' && value > 0)
		);
	};

	const handleSubmit = (event) => {
		const courseFields: Course = {
			...courseDetails,
			id: uuidv4(),
			duration: courseDuration,
			authors: courseAuthors.map((author) => author.id),
		};

		if (validateFields(courseFields).length != 6) {
			alert(COURSE_ERROR);
		} else {
			addAuthor((prevState) => [...prevState, ...courseAuthors]);
			addCourse((prevState) => [...prevState, courseFields]);
			setIsFormVisible(false);
		}
		event.preventDefault();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<span>
					<Button
						className={styles.createButton}
						text={CREATE_COURSE}
						type='submit'
					/>
				</span>
				<FormGroup>
					<Input
						labelText={TITLE}
						placeholder={TITLE_PLACEHOLDER}
						handleChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						labelText={DESCRIPTION}
						placeholder={DESCR_PLACEHOLDER}
						type='textarea'
						handleChange={handleChange}
					/>
				</FormGroup>
			</Row>
			<Row>
				<Col md={6}>
					<h5>{ADD_AUTHOR}</h5>
					<FormGroup>
						<Input
							labelText={AUTHOR_NAME}
							value={authorName}
							placeholder={AUTHOR_PLACEHOLDER}
							handleChange={(event) => setAuthorName(event.target.value)}
						/>
						<Button
							text={CREATE_AUTHOR}
							handleButtonClick={handleAuthorCreate}
						/>
					</FormGroup>
					<FormGroup>
						<h5>{DURATION}</h5>
						<Input
							labelText={DURATION}
							value={duration}
							placeholder={DURATION_PLACEHOLDER}
							handleChange={handleDuration}
							pattern='[0-9]*'
						/>
					</FormGroup>
					<h3>
						{DURATION}: {formatedDuration}
					</h3>
				</Col>
				<Col md={6}>
					<FormGroup>
						<h5>{AUTHORS}</h5>
						<List type='unstyled'>
							{authors.map((author) => (
								<li key={author.id}>
									<AuthorItem
										author={author}
										buttonText={ADD_AUTHOR}
										handleAuthorItemClick={handleAuthorAdd}
									/>
								</li>
							))}
						</List>
					</FormGroup>
					<FormGroup>
						<h5>{COURSE_AUTHORS}</h5>
						{courseAuthors.length < 1 ? (
							<span>{EMPTY_AUTHORS}</span>
						) : (
							<List type='unstyled'>
								{courseAuthors.map((author) => (
									<li key={author.id}>
										<AuthorItem
											author={author}
											buttonText={DELETE_AUTHOR}
											handleAuthorItemClick={handleAuthorDelete}
										/>
									</li>
								))}
							</List>
						)}
					</FormGroup>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateCourse;
