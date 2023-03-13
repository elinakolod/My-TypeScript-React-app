import prettifyNumbers from './prettifyNumbers';

const formatCreationDate = () => {
	const date = new Date();
	return `${prettifyNumbers(date.getDate())}/${prettifyNumbers(
		date.getMonth() + 1
	)}/${date.getFullYear()}`;
};

export default formatCreationDate;
