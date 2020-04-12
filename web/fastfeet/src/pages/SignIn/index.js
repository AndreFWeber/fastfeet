/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
	email: Yup.string()
		.email('insira um e-mail válido')
		.required('O e-mail é obrigatório'),
	password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
	function handleSubmit(data) {
		console.tron.log(data);
	}
	return (
		<>
			<img src={logo} alt="FastFeet" />
			<Form schema={schema} onSubmit={handleSubmit}>
				<label>
					SEU EMAIL
					<Input name="email" type="email" placeholder="Seu E-mail" />
				</label>
				<br />
				<label>
					SUA SENHA
					<Input
						name="password"
						type="password"
						placeholder="Senha"
					/>
				</label>
				<button type="submit">Entrar no sistema</button>
			</Form>
		</>
	);
}
