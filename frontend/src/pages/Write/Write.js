import React, { Component } from "react";
import { insertEntry } from "../../database";
import getDate from "../../utils/getDate";

import style from "./write.scss";

class Write extends Component {
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
			<div className={style.main}>
				<header className={style.header}>
					<h1 className={style.title}>plugable-diary</h1>
				</header>
				<input
					value={title}
					onChange={this.onChangeTitle}
					type="text"
				/>
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
		);
	}
}

export default Write;