import React from "react";
import style from "./entrypreview.scss";

const EntryPreview = ({ title, timestamp, text }) => (
	<div className={style.main}>
		<h2>{title}</h2>
		<h5>{timestamp}</h5>
		<p>{text}</p>
	</div>
);

export default EntryPreview;
