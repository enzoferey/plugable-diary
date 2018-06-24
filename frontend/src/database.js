import axios from "axios";

const baseUrl = "http://localhost:8000";

export const login = props =>
	axios.get(baseUrl + "/login", { params: { ...props } });

export const checkCookie = props =>
	axios.get(baseUrl + "/cookie", { params: { ...props } });

export const getEntries = props =>
	axios.get(baseUrl + "/entries", { params: { ...props } });

export const insertEntry = props =>
	axios.post(baseUrl + "/entries", {
		...props,
	});
