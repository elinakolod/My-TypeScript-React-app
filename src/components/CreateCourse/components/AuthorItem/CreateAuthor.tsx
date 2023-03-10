import React from 'react';

import {
	CREATE_AUTHOR,
	AUTHOR_NAME,
	AUTHOR_PLACEHOLDER,
} from '../../../../constants.js';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

type CreateAuthorProps = {
	handleAuthorCreate: (event: unknown) => void;
};

const CreateAuthor = ({ handleAuthorCreate }: CreateAuthorProps) => (
	<div className=''>
		<Input labelText={AUTHOR_NAME} placeholder={AUTHOR_PLACEHOLDER} />
		<Button text={CREATE_AUTHOR} handleButtonClick={handleAuthorCreate} />
	</div>
);

export default CreateAuthor;
