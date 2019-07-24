import Axios from "axios";

// TODO: Find a better way to toggle this during development and releases
// Axios.defaults.baseURL = "http://chop9ja.appspot.com/";
// Axios.defaults.baseURL = "http://localhost:5000/";

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
		// alert("Bad network connection try again");
	}
	return Promise.reject(error);
});
