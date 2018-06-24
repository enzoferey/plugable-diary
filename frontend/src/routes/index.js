import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";

const Routes = () => (
	<Router>
		<Fragment>
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
		</Fragment>
	</Router>
);

export default Routes;
