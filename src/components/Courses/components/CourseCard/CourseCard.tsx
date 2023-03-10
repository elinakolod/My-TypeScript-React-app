import React from 'react';

import {
	SHOW_COURSE,
	AUTORS,
	DURATION,
	CREATED,
} from '../../../../constants.js';

import Button from '../../../../common/Button/Button';
import { Card, CardBody, CardTitle, CardText, List } from 'reactstrap';

import formatDuration from '../../../../helpers/formatDuration';

type CourseProps = {
	course: {
		title: string;
		description: string;
		creationDate: string;
		duration: number;
		authors: string[];
	};
};

const CourseCard = ({ course }: CourseProps) => {
	return (
		<Card className='my-2'>
			<CardBody>
				<CardTitle tag='h2'>{course.title}</CardTitle>
				<CardText>{course.description}</CardText>
			</CardBody>
			<CardBody>
				<List type='unstyled'>
					<li>
						<b>{AUTORS}</b>
						{course.authors.join(', ')}
					</li>
					<li>
						<b>{DURATION}</b>
						{formatDuration(course.duration)}
					</li>
					<li>
						<b>{CREATED}</b>
						{course.creationDate.replace(/\//g, '.')}
					</li>
				</List>
				<Button text={SHOW_COURSE} />
			</CardBody>
		</Card>
	);
};

export default CourseCard;
