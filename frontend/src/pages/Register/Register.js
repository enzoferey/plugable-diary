import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import style from "./register.scss";

import { login, register } from "@db";
import Header from "@components/Header";
import withAuth from "@contexts/withAuth";

const Field = ({ label, ...rest }) => (
	<Fragment>
		{label}
		<br />
		<input {...rest} />
		<br />
		<br />
	</Fragment>
);

class Register extends React.Component {
	state = {
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
		error: "",
	};

	onSubmit = e => {
		e.preventDefault();

		const { username, email, password, passwordConfirm } = this.state;

		if (password === passwordConfirm) {
			register({ username, email, password })
				.then(response => {
					const session = {
						email,
						token: response.data.data,
					};

					// Set data in global "store"
					this.props.setSession(session);

					// Save session in cookies
					Cookies.set("session", JSON.stringify(session), {
						expires: 7,
					});
				})
				.catch(error => {
					this.setState({ error: "Error happent" });
				});
		} else {
			this.setState({ error: "Passwords don't match" });
		}
	};
	onChangeUsername = e => this.setState({ username: e.target.value });
	onChangeEmail = e => this.setState({ email: e.target.value });
	onChangePassword = e => this.setState({ password: e.target.value });
	onChangePasswordConfirm = e =>
		this.setState({ passwordConfirm: e.target.value });

	render() {
		const {
			username,
			email,
			password,
			passwordConfirm,
			error,
		} = this.state;
		const { from } = this.props.location.state || {
			from: { pathname: "/" },
		};

		if (this.props.isAuthenticated) {
			return <Redirect to={from} />;
		}

		return (
			<Fragment>
				<Header />
				<div className={style.main}>
					<form className={style.form} onSubmit={this.onSubmit}>
						<Field
							label="Username"
							type="text"
							value={username}
							onChange={this.onChangeUsername}
						/>
						<Field
							label="Email"
							type="email"
							value={email}
							onChange={this.onChangeEmail}
						/>
						<Field
							label="Password"
							type="password"
							value={password}
							onChange={this.onChangePassword}
						/>
						<Field
							label="Password (confirm)"
							type="password"
							value={passwordConfirm}
							onChange={this.onChangePasswordConfirm}
						/>
						{error !== "" && (
							<span className={style.error}>{error}</span>
						)}
						<input type="submit" value="Login" />
					</form>
				</div>
			</Fragment>
		);
	}
}

export default withAuth(Register);
