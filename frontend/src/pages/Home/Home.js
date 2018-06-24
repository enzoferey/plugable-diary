import React, { Fragment } from "react";
import style from "./home.scss";

import Header from "@components/Header";
import EntryPreview from "@components/EntryPreview";

class Home extends React.Component {
	state = {
		search: "",
	};

	componentDidMount = () => {
		console.log("Mounted Home");
		this.props.getEntries();
	};

	onSearchChange = e => this.setState({ search: e.target.value });

	getEntriesSearched = () => {
		const { search } = this.state;
		const lowerCaseSearch = search.toLowerCase();
		return this.props.entries.filter(
			entry =>
				entry.title.toLowerCase().includes(lowerCaseSearch) ||
				entry.text.toLowerCase().includes(lowerCaseSearch)
		);
	};

	render() {
		const { search } = this.state;
		const entries = this.getEntriesSearched();

		return (
			<Fragment>
				<Header />
				<div className={style.main}>
					<input
						className={style.input}
						type="text"
						value={search}
						onChange={this.onSearchChange}
						placeholder="Search content..."
					/>
					{entries.map(entry => (
						<EntryPreview key={`entry-${entry.id}`} {...entry} />
					))}
				</div>
			</Fragment>
		);
	}
}

export default Home;
