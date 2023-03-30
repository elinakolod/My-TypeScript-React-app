import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from 'store/users/usersSlice';

import api from 'utils/api';

import {
	EMAIL,
	PASSWORD,
	EMAIL_PLACEHOLDER,
	PASSWORD_PLACEHOLDER,
	REGISTRATION,
	LOGIN_NOTICE,
	LOGIN,
} from 'constants/constants';
import Path from 'constants/Path';

import { Container, Form, FormGroup, Alert } from 'reactstrap';
import Input from 'common/Input/Input';
import Button from 'common/Button/Button';

import { User } from 'components/Auth/User.types';

import styles from 'components/Auth/Auth.module.css';

const formInputs: User = {
	email: '',
	password: '',
};

const Login = () => {
	const [user, setUser] = useState(formInputs);
	const [error, setError] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
		loginUser();

		event.preventDefault();
	};

	const loginUser = async () => {
		try {
			const response = await api.auth.login(user);

			dispatch(login(response));
			localStorage.setItem('token', response.result);
			navigate(`/${Path.course.index}`);
		} catch (error) {
			setError(error.response.data.errors);
		}
	};

	return (
		<Container className={styles.authForm}>
			{error && <Alert color='danger'>{error}</Alert>}
			<h2>{LOGIN}</h2>
			<Form onSubmit={handleSubmit}>
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
				<Button color='success'>{LOGIN}</Button>
			</Form>
			{LOGIN_NOTICE}
			<Link to={`/${Path.registration}`}> {REGISTRATION}</Link>
		</Container>
	);
};

export default Login;
