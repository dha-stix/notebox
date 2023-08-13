export const suggestions = [
	{ id: "Work", text: "Work" },
	{ id: "Personal", text: "Personal" },
	{ id: "Others", text: "Others" },
	{ id: "Loved Ones", text: "Loved Ones" },
].map((type) => {
	return {
		id: type.id,
		text: type.text,
	};
});
const KeyCodes = {
	comma: 188,
	enter: 13,
};
export const delimiters = [KeyCodes.comma, KeyCodes.enter];


export const generateID = () => Math.random().toString(36).substring(2, 10);
