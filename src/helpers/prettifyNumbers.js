const prettifyNumbers = (value) => {
	return value < 10 ? `0${value}` : value;
};

export default prettifyNumbers;
