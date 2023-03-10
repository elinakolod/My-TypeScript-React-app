import prettifyNumbers from './prettifyNumbers';

const formatDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const mins = duration % 60;
	return `${prettifyNumbers(hours)}:${prettifyNumbers(mins)} hour${
		hours === 1 ? '' : 's'
	}`;
};

export default formatDuration;
