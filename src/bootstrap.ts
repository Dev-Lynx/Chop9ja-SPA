import Axios from "axios";

let baseUrl = "";

switch (process.env.REACT_APP_HOST_ENV)
{
	case "local": baseUrl = "https://localhost:5001/"; break;

	default:
	case "staging": 
	case "development":
		baseUrl = "http://chop9ja.appspot.com/"; break;

	case "production": baseUrl = ""; break;
}

Axios.defaults.baseURL = baseUrl;

Axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
Axios.interceptors.request.use((value) => {
	return value;
}, (error) => {
	return Promise.reject(error);
});
Axios.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (!error.response) {
		console.log(error);
		// alert("Bad network connection try again");
	}
	return Promise.reject(error);
});
