import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import {
	EMAIL,
	PASSWORD,
	EMAIL_PLACEHOLDER,
	PASSWORD_PLACEHOLDER,
	REGISTRATION,
	LOGIN_NOTICE,
	LOGIN,
} from 'constants/constants';

import { Container, Form, FormGroup } from 'reactstrap';
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
		loginUser();
	};

	const loginUser = async () => {
		try {
			const response = await axios.post('http://localhost:4000/login', user);
			localStorage.setItem('token', response.data.result);
			localStorage.setItem('user', response.data.user.name);
			navigate('/courses');
		} catch (error) {
			alert(error.response.data.errors.join('\n'));
		}
	};

	return (
		<Container className={styles.authForm}>
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
			<Link to='/registration'> {REGISTRATION}</Link>
		</Container>
	);
};

export default Login;
