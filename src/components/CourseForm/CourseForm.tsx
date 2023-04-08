import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createCourse, updateCourse } from 'store/courses/thunk';
import { allCourses } from 'store/courses/selectors';
import { createAuthor } from 'store/authors/thunk';
import { allAuthors } from 'store/authors/selectors';

import { AppDispatch } from 'store';

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
	UPDATE_COURSE,
} from 'constants/constants';
import Path from 'constants/Path';

import styles from './CourseForm.module.css';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { Form, Row, Col, FormGroup, List, Container } from 'reactstrap';

//import formatCreationDate from 'helpers/formatCreationDate';
import formatDuration from 'helpers/formatDuration';

import { Course } from 'components/Courses/Course.types';

const formInputs = {
	id: '',
	title: '',
	description: '',
	duration: '',
	creationDate: '',
	authors: [],
};

const CourseForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const params = useParams();
	const authors = useSelector(allAuthors);
	const courses = useSelector(allCourses);
	const [authorName, setAuthorName] = useState('');
	const [course, setCourse] = useState(formInputs);
	const courseId = params.courseId;

	useEffect(() => {
		if (courseId) {
			const course = courses.find((course) => course.id === courseId);
			setCourse({
				...course,
				authors: course.authors.map((authorId) =>
					authors.find((author) => author.id === authorId)
				),
			});
		}
	}, [courseId]);

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
				authors: prevState.authors.filter(
					(author) => author.id !== authorId
				),
			};
		});
	};

	const handleAuthorCreate = () => {
		if (!INVALID_SUMBOLS.test(authorName) && authorName.length > 1) {
			const author = { name: authorName };

			dispatch(createAuthor(author));
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
					authors.find((author) => author.id === authorId),
				],
			};
		});
	};

	const handleSubmit = (event) => {
		if (
			course.authors.length &&
			course.title.length > 1 &&
			course.description.length > 1 &&
			+course.duration > 0
		) {
			const courseFields: Course = {
				...course,
				duration: +course.duration,
				authors: course.authors.map((author) => author.id),
			};

			courseId
				? dispatch(updateCourse(courseFields))
				: dispatch(createCourse(courseFields));
			navigate(`/${Path.course.index}`);
		} else {
			alert(COURSE_ERROR);
		}

		event.preventDefault();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Container>
				<Button className={styles.createButton}>
					{courseId ? UPDATE_COURSE : CREATE_COURSE}
				</Button>
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
							onChange={(event) =>
								setAuthorName(event.target.value)
							}
						/>
						<Button onClick={handleAuthorCreate}>
							{CREATE_AUTHOR}
						</Button>
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
						{course.duration
							? formatDuration(+course.duration)
							: DEFAULT_HOURS}
					</h3>
				</Col>
				<Col md={6}>
					<FormGroup>
						<h5>{AUTHORS}</h5>
						{authors.length < 1 ? (
							EMPTY_AUTHORS
						) : (
							<List type='unstyled'>
								{authors.map((author) => {
									if (!course.authors.includes(author))
										return (
											<li key={author.id}>
												<AuthorItem
													author={author}
													buttonText={ADD_AUTHOR}
													handleAuthorItemClick={
														handleAuthorAdd
													}
												/>
											</li>
										);
								})}
							</List>
						)}
					</FormGroup>
					<FormGroup>
						<h5>{COURSE_AUTHORS}</h5>
						{course.authors.length < 1 ? (
							EMPTY_AUTHORS
						) : (
							<List type='unstyled'>
								{course.authors.map((author) => (
									<li key={author.id}>
										<AuthorItem
											author={author}
											buttonText={DELETE_AUTHOR}
											handleAuthorItemClick={
												handleAuthorDelete
											}
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

export default CourseForm;
