import axios from "axios";

export const insertEntry = props =>
	axios.post("http://localhost:8000/", {
		...props
	});
