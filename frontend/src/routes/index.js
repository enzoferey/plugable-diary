import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Cookies from "js-cookie";

import { checkCookie } from "@db";
import AuthContext from "@contexts/AuthContext";

import Home from "@pages/Home";
import Login from "@pages/Login";
import Write from "@pages/Write";

import Spinner from "@components/Spinner";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

const emptySession = {
	checkingCookie: false,
	email: "",
	token: null,
};

const getInitialSession = () => {
	let cookie = Cookies.get("session");

	// check for undefined
	if (cookie) {
		cookie = JSON.parse(cookie);
		cookie.checkingCookie = true;
	}

	console.log(cookie);

	return cookie || emptySession;
};

class Routes extends React.Component {
	state = {
		session: getInitialSession(),
	};

	setSession = session => this.setState({ session: { ...session } });
	removeSession = () => this.setState({ session: emptySession });

	componentDidMount = () => {
		const { checkingCookie, email, token } = this.state.session;
		if (checkingCookie) {
			checkCookie({ email, token })
				.then(result => {
					const sessionData = {
						email: this.state.session.email,
						token: result.data.data,
					};
					this.setState(state => ({
						session: {
							checkingCookie: false,
							...sessionData,
						},
					}));
					Cookies.set("session", JSON.stringify(sessionData), { expires: 7 });
				})
				.catch(err => {
					console.log(err);
					this.removeSession();
					Cookies.remove("session");
				});
		}
	};

	render() {
		const { session } = this.state;
		const isAuthenticated =
			!session.checkingCookie && session.email !== "" && session.token !== null;

		if (session.checkingCookie) return <Spinner />;

		return (
			<Router>
				<Switch>
					<AuthContext.Provider
						value={{
							session,
							setSession: this.setSession,
							removeSession: this.removeSession,
						}}
					>
						<PrivateRoute
							exact
							path="/"
							component={Home}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path="/write"
							component={Write}
							isAuthenticated={isAuthenticated}
						/>
						<Route
							path="/login"
							render={props => (
								<Login {...props} isAuthenticated={isAuthenticated} />
							)}
						/>
					</AuthContext.Provider>
				</Switch>
			</Router>
		);
	}
}

export default Routes;
