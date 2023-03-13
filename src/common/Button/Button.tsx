import React, { MouseEvent } from 'react';

import { Button as StrapButton } from 'reactstrap';

type ButtonProps = {
	className?: string;
	text: string;
	type: 'button' | 'submit' | 'reset';
	name?: string;
	handleButtonClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & typeof defaultProps;

const defaultProps = {
	text: '',
	type: 'button',
};

const Button = ({
	className,
	text,
	type,
	name,
	handleButtonClick,
}: ButtonProps) => (
	<StrapButton
		className={className}
		color='primary'
		type={type}
		name={name}
		onClick={handleButtonClick}
	>
		{text}
	</StrapButton>
);

Button.defaultProps = defaultProps;

export default Button;
