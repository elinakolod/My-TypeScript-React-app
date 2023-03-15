import React, { MouseEvent } from 'react';

import Button from 'common/Button/Button';

import { Author } from 'components/Courses/Course.types';

type AuthorProps = {
	author: Author;
	buttonText: string;
	handleAuthorItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const AuthorItem = ({
	author,
	buttonText,
	handleAuthorItemClick,
}: AuthorProps) => (
	<>
		{author.name}
		<Button name={author.id} onClick={handleAuthorItemClick}>
			{buttonText}
		</Button>
	</>
);

export default AuthorItem;
