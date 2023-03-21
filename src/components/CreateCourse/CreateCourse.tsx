import { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {
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
} from 'constants/constants';

import styles from './CreateCourse.module.css';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { Form, Row, Col, FormGroup, List, Container } from 'reactstrap';

import formatCreationDate from 'helpers/formatCreationDate';
import formatDuration from 'helpers/formatDuration';

import { Course, Author } from 'components/Courses/Course.types';

type CourseFormProps = {
	addCourse: Dispatch<SetStateAction<unknown>>;
	addAuthor: Dispatch<SetStateAction<unknown>>;
	setIsFormVisible: Dispatch<SetStateAction<unknown>>;
	allAuthors: Author[];
};

const formInputs = {
	id: uuidv4(),
	title: '',
	description: '',
	creationDate: formatCreationDate(),
	duration: '',
	authors: [],
};

const CreateCourse = ({
	addCourse,
	addAuthor,
	setIsFormVisible,
	allAuthors,
}: CourseFormProps) => {
	const [authorName, setAuthorName] = useState('');
	const [course, setCourse] = useState(formInputs);
	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (!INVALID_SUMBOLS.test(value)) {
			setCourse((prevState) => {
				return {
					...prevState,
					[name]: value,
				};
			});
		}
	};

	const handleAuthorDelete = (event) => {
		const authorId = event.target.name;
		setCourse((prevState) => {
			return {
				...prevState,
				authors: prevState.authors.filter((author) => author.id !== authorId),
			};
		});
	};

	const handleAuthorCreate = () => {
		if (!INVALID_SUMBOLS.test(authorName)) {
			addAuthor((prevState) => [
				...prevState,
				{ id: uuidv4(), name: authorName },
			]);
		}
		setAuthorName('');
	};

	const handleAuthorAdd = (event) => {
		const authorId = event.target.name;
		setCourse((prevState) => {
			return {
				...prevState,
				authors: [
					...prevState.authors,
					allAuthors.find((author) => author.id === authorId),
				],
			};
		});
	};

	const handleSubmit = (event) => {
		if (
			Object.values(course).every((input) => !!input) &&
			course.title.length > 1 &&
			course.description.length > 1 &&
			+course.duration > 0
		) {
			const courseFields: Course = {
				...course,
				duration: +course.duration,
				authors: course.authors.map((author) => author.id),
			};
			addCourse((prevState) => [...prevState, courseFields]);
			setIsFormVisible(false);
			navigate('/courses');
		} else {
			alert(COURSE_ERROR);
		}
		event.preventDefault();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Container>
				<Button className={styles.createButton}>{CREATE_COURSE}</Button>
				<FormGroup>
					<Input
						labelText={TITLE}
						placeholder={TITLE_PLACEHOLDER}
						value={course.title}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						labelText={DESCRIPTION}
						placeholder={DESCR_PLACEHOLDER}
						type='textarea'
						value={course.description}
						onChange={handleChange}
					/>
				</FormGroup>
			</Container>
			<Row>
				<Col md={6}>
					<h5>{ADD_AUTHOR}</h5>
					<FormGroup>
						<Input
							labelText={AUTHOR_NAME}
							value={authorName}
							placeholder={AUTHOR_PLACEHOLDER}
							onChange={(event) => setAuthorName(event.target.value)}
						/>
						<Button onClick={handleAuthorCreate}>{CREATE_AUTHOR}</Button>
					</FormGroup>
					<FormGroup>
						<h5>{DURATION}</h5>
						<Input
							labelText={DURATION}
							value={course.duration.toString()}
							placeholder={DURATION_PLACEHOLDER}
							onChange={handleChange}
							type='number'
						/>
					</FormGroup>
					<h3>
						{DURATION}:{' '}
						{course.duration ? formatDuration(+course.duration) : DEFAULT_HOURS}
					</h3>
				</Col>
				<Col md={6}>
					<FormGroup>
						<h5>{AUTHORS}</h5>
						<List type='unstyled'>
							{allAuthors.map((author) => {
								if (!course.authors.includes(author))
									return (
										<li key={author.id}>
											<AuthorItem
												author={author}
												buttonText={ADD_AUTHOR}
												handleAuthorItemClick={handleAuthorAdd}
											/>
										</li>
									);
							})}
						</List>
					</FormGroup>
					<FormGroup>
						<h5>{COURSE_AUTHORS}</h5>
						{course.authors.length < 1 ? (
							<>{EMPTY_AUTHORS}</>
						) : (
							<List type='unstyled'>
								{course.authors.map((author) => (
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
