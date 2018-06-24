import React from "react";
import style from "./header.scss";

import withAuth from "@contexts/withAuth";

const Header = (props) => (
	<header className={style.main}>
		<p>{props.session.token}</p>
		<h1 className={style.title}>plugable-diary</h1>
	</header>
);

export default withAuth(Header);
