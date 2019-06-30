import Axios from "axios";

Axios.defaults.baseURL = "http://chop9ja.appspot.com/";
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
