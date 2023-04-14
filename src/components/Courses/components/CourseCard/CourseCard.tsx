import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { destroyCourse } from 'store/courses/thunk';
import { isUserAdmin } from 'store/users/selectors';

import { AppDispatch } from 'store';

import { SHOW_COURSE, AUTORS, DURATION, CREATED } from 'constants/constants';

import Button from 'common/Button/Button';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';

import formatDuration from 'helpers/formatDuration';

import { Course } from 'components/Courses/Course.types';

import Path from 'constants/Path';

import styles from 'components/Courses/Courses.module.css';

type CourseProps = {
	course: Course;
};

const CourseCard = ({ course }: CourseProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const isAdmin = useSelector(isUserAdmin);

	const courseCard = useMemo(() => {
		return {
			...course,
			duration: formatDuration(course.duration),
			creationDate: course.creationDate.replace(/\//g, '.'),
			authors: course.authors.join(', '),
		};
	}, [course]);

	const handleDelete = () => {
		dispatch(destroyCourse(course.id));
	};

	return (
		<Card className={`my-2 ${styles.courseCard}`}>
			<CardBody>
				<CardTitle tag='h2'>{courseCard.title}</CardTitle>
				<CardText>{courseCard.description}</CardText>
			</CardBody>
			<CardBody>
				<dl>
					<dt>{AUTORS}</dt>
					<dd>{courseCard.authors}</dd>
					<dt>{DURATION}</dt>
					<dd>{courseCard.duration}</dd>
					<dt>{CREATED}</dt>
					<dd>{courseCard.creationDate}</dd>
				</dl>
				<Button>
					<Link to={course.id} state={courseCard}>
						{SHOW_COURSE}
					</Link>
				</Button>
				{isAdmin && (
					<>
						<Button>
							<Link to={`${Path.course.update}/${course.id}`}>
								<IoPencilOutline />
							</Link>
						</Button>
						<Button onClick={handleDelete}>
							<IoTrashBinOutline />
						</Button>
					</>
				)}
			</CardBody>
		</Card>
	);
};

export default CourseCard;
