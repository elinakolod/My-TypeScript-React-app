import React, { MouseEvent } from 'react';

import Button from '../../../../common/Button/Button';

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
		<Button
			text={buttonText}
			name={author.id}
			handleButtonClick={handleAuthorItemClick}
		/>
	</div>
);

export default AuthorItem;
