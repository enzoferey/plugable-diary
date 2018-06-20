import axios from "axios";

export const insertEntry = text =>
	axios.post("http://localhost:8000/", {
		text
	});
