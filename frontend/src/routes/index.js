import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Cookies from "js-cookie";

import { checkCookie, getEntries } from "@db";
import AuthContext from "@contexts/AuthContext";

import Home from "@pages/Home";
import Login from "@pages/Login";
import Write from "@pages/Write";

import Spinner from "@components/Spinner";

const PrivateRoute = ({ render: Component, isAuthenticated, ...rest }) => (
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
		entries: [],
	};

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

	setSession = session => this.setState({ session: { ...session } });
	removeSession = () => this.setState({ session: emptySession });

	getEntries = () =>
		getEntries({ email: this.state.session.email })
			.then(result => this.setState({ entries: result.data.data }))
			.catch(err => console.log(err));

	checkAuthentication = () => {
		const { checkingCookie, email, token } = this.state.session;
		return !checkingCookie && email !== "" && token !== null;
	}

	renderHome = props => (
		<Home
			{...props}
			entries={this.state.entries}
			getEntries={this.getEntries}
		/>
	);

	renderWrite = props => <Write {...props} />;

	renderLogin = props => <Login {...props} isAuthenticated={this.checkAuthentication()} />;

	render() {
		console.log("Re render routes");
		const { session, entries } = this.state;
		const isAuthenticated = this.checkAuthentication();
			
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
							render={this.renderHome}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path="/write"
							render={this.renderWrite}
							isAuthenticated={isAuthenticated}
						/>
						<Route path="/login" render={this.renderLogin} />
					</AuthContext.Provider>
				</Switch>
			</Router>
		);
	}
}

export default Routes;
