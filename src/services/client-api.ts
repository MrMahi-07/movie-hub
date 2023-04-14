import axios from "axios";

axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		key: "2e0699049f9dd7ffb5f0f86681af1fb6",
	},
});
