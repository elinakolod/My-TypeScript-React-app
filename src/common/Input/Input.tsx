import React, { ChangeEvent } from 'react';

import { Label, Input as StrapInput } from 'reactstrap';

type InputProps = {
	labelText: string;
	value?: string;
	placeholder: string;
	pattern?: string;
	type?: 'text' | 'textarea';
	handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
	labelText,
	value,
	placeholder,
	pattern,
	type,
	handleChange,
}: InputProps) => (
	<Label for='courseInput'>
		{labelText}
		<StrapInput
			id='courseInput'
			name={labelText.toLowerCase()}
			value={value}
			placeholder={placeholder}
			pattern={pattern}
			type={type}
			onChange={handleChange}
		/>
	</Label>
);

export default Input;
