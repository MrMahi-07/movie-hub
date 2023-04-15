import axios from "axios";

export default axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: "2e0699049f9dd7ffb5f0f86681af1fb6",
	},
});
