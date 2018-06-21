const getDate = () => {
	const date = new Date();

	const onlyDate = date.toJSON().substring(0, 10);
	const dateParts = onlyDate.split("-");

	return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};

export default getDate;
