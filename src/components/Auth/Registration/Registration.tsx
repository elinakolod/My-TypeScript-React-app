import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from 'store/users/thunk';

import { AppDispatch } from 'store';

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

import { Container, Form, FormGroup } from 'reactstrap';
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
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

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
		const response = await dispatch(register(user));
		console.log(response);
		if (!response.error) navigate(`/${Path.login}`);
	};

	return (
		<Container className={styles.authForm}>
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
