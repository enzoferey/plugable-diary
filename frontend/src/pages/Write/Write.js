import React, { Fragment } from "react";
import { insertEntry } from "@db";
import getDate from "@utils/getDate";
import parseEmojis from "@utils/parseEmojis";

import style from "./write.scss";

import showdown from "showdown";

import Header from "@components/Header";
import WriteAndPreview from "@components/WriteAndPreview";

const converter = new showdown.Converter();

class Write extends React.Component {
	state = {
		title: `Diary ${getDate()}`,
		text: "",
	};

	onChangeTitle = e => {
		this.setState({ title: e.target.value });
	};

	onChangeText = e => {
		this.setState({ text: parseEmojis(e.target.value) });
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
					<div style={{ width: "80%", margin: "0 auto" }}>
						<WriteAndPreview
							value={text}
							onChange={this.onChangeText}
							transform={text => converter.makeHtml(text)}
						/>
					</div>
					<br />
					<br />
					<button onClick={this.onClick}>Save</button>
				</div>
			</Fragment>
		);
	}
}

export default Write;
