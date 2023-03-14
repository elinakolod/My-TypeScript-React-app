import React, { MouseEvent } from 'react';

import Button from 'common/Button/Button';

type AuthorProps = {
	author: {
		id: string;
		name: string;
	};
	buttonText: string;
	handleAuthorItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const AuthorItem = ({
	author,
	buttonText,
	handleAuthorItemClick,
}: AuthorProps) => (
	<div className=''>
		<span>{author.name}</span>
		<Button name={author.id} onClick={handleAuthorItemClick}>
			{buttonText}
		</Button>
	</div>
);

export default AuthorItem;
