import React from "react";
import PropTypes from "prop-types";

import style from "./writeandpreview.scss";

const WriteAndPreview = ({ value, onChange, transform }) => (
	<div className={style.main}>
		<div className={style.write}>
			<textarea
				className={style.textarea}
				value={value}
				onChange={onChange}
				cols="30"
				rows="10"
			/>
		</div>
		<div className={style.preview}>
			<div dangerouslySetInnerHTML={{ __html: transform(value) }} />
		</div>
	</div>
);

WriteAndPreview.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	transform: PropTypes.func,
};

export default WriteAndPreview;
