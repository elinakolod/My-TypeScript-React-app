import {
	Label,
	Input as StrapInput,
	InputProps as StrapInputProps,
} from 'reactstrap';

interface InputProps extends StrapInputProps {
	labelText?: string;
}

const Input = ({ labelText, ...props }: InputProps) => (
	<Label>
		{labelText}
		<StrapInput name={labelText.toLowerCase()} {...props} />
	</Label>
);

export default Input;
