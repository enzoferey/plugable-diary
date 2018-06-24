import React, { Fragment } from "react";
import { insertEntry } from "@db";
import getDate from "@utils/getDate";

import style from "./write.scss";

import Header from "@components/Header";

class Write extends React.Component {
	state = {
		title: `Diary ${getDate()}`,
		text: ""
	};

	onChangeTitle = e => {
		this.setState({ title: e.target.value });
	};

	onChangeText = e => {
		this.setState({ text: e.target.value });
	};

	onClick = () => {
		insertEntry({ ...this.state })
			.then(response => {
				this.setState({ text: "Saved !" });
			})
			.catch(error => {
				this.setState({ text: "Error happent" });
			});
	};

	render() {
		const { title, text } = this.state;

		return (
			<Fragment>
				<Header />
				<div className={style.main}>
					<input value={title} onChange={this.onChangeTitle} type="text" />
					<br />
					<br />
					<textarea
						className={style.textarea}
						value={text}
						onChange={this.onChangeText}
						cols="30"
						rows="10"
					/>
					<br />
					<br />
					<button onClick={this.onClick}>Save</button>
				</div>
			</Fragment>
		);
	}
}

export default Write;
