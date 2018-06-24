import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import style from "./login.scss";

import { login } from "@db";
import Header from "@components/Header";
import withAuth from "@contexts/withAuth";

class Login extends React.Component {
	state = {
		email: "",
		password: "",
		error: "",
	};

	onSubmit = e => {
		e.preventDefault();

		const { email, password } = this.state;
		login({ email, password })
			.then(response => {
				const session = {
					email,
					token: response.data.data,
				};

				// Set data in global "store"
				this.props.setSession(session);

				// Save session in cookies
				Cookies.set("session", JSON.stringify(session), { expires: 7 });
			})
			.catch(error => {
				this.setState({ error: "Error happent" });
			});
	};
	onChangeEmail = e => this.setState({ email: e.target.value });
	onChangePassword = e => this.setState({ password: e.target.value });

	render() {
		const { email, password, error } = this.state;
		const { from } = this.props.location.state || { from: { pathname: "/" } };

		if (this.props.isAuthenticated) {
			return <Redirect to={from} />;
		}

		return (
			<Fragment>
				<Header />
				<div className={style.main}>
					<form className={style.form} onSubmit={this.onSubmit}>
						Email
						<br />
						<input
							type="text"
							name="email"
							value={email}
							onChange={this.onChangeEmail}
						/>
						<br />
						<br />
						Password
						<br />
						<input
							type="password"
							name="password"
							value={password}
							onChange={this.onChangePassword}
						/>
						<br />
						<br />
						{error !== "" && <span className={style.error}>{error}</span>}
						<input type="submit" value="Login" />
					</form>
				</div>
			</Fragment>
		);
	}
}

export default withAuth(Login);
