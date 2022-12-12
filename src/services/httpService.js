import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE;

const instance = axios.create({
	baseURL,
	timeout: 15000
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
	return {
		...config,
		headers: {
			Accept: 'application/json',
			Authorization: config.token,
			// 'Content-Type': 'multipart/form-data',
		},
	};
});

const responseBody = response => response.data;

const requests = {
	get: url => instance.get(url).then(responseBody),
	post: (url, body,token) => instance.post(url, body,token).then(responseBody),
	patch: (url, body) => instance.patch(url, body).then(responseBody),
	delete: url => instance.delete(url).then(responseBody),
};

export default requests;
