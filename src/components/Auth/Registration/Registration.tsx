import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from 'utils/api';

import {
	NAME,
	EMAIL,
	PASSWORD,
	NAME_PLACEHOLDER,
	EMAIL_PLACEHOLDER,
	PASSWORD_PLACEHOLDER,
	REGISTRATION,
	REG_NOTICE,
	LOGIN,
} from 'constants/constants';
import Path from 'constants/Path';

import { Container, Form, FormGroup, Alert } from 'reactstrap';
import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import { User } from 'components/Auth/User.types';

import styles from 'components/Auth/Auth.module.css';

const formInputs: User = {
	name: '',
	email: '',
	password: '',
};

const Registration = () => {
	const [user, setUser] = useState(formInputs);
	const [error, setError] = useState();
	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		registerUser();
	};

	const registerUser = async () => {
		try {
			await api.auth.register(user);
			navigate(`/${Path.login}`);
		} catch (error) {
			setError(error.response.data.errors);
		}
	};

	return (
		<Container className={styles.authForm}>
			{error && <Alert color='danger'>{error}</Alert>}
			<h2>{REGISTRATION}</h2>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Input
						labelText={NAME}
						placeholder={NAME_PLACEHOLDER}
						value={user.name}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						labelText={EMAIL}
						placeholder={EMAIL_PLACEHOLDER}
						value={user.email}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						labelText={PASSWORD}
						placeholder={PASSWORD_PLACEHOLDER}
						value={user.password}
						type='password'
						onChange={handleChange}
					/>
				</FormGroup>
				<Button color='success'>{REGISTRATION}</Button>
			</Form>
			{REG_NOTICE}
			<Link to={`/${Path.login}`}> {LOGIN}</Link>
		</Container>
	);
};

export default Registration;
