import React from 'react';

import { Button as StrapButton, ButtonProps } from 'reactstrap';

const Button = ({ children, ...props }: ButtonProps) => (
	<StrapButton color='primary' {...props}>
		{children}
	</StrapButton>
);

export default Button;
