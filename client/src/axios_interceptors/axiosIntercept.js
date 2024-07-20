// import axios from "axios";
// axiosInterceptor.js

export const setupInterceptors = axiosInstance => {
    axiosInstance.interceptors.request.use(function (config) {
        // Retrieve the token from local storage
        const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
        // If the token exists, set it in the Authorization header
        if (token !== "" && token !== undefined && token !== null) {
            config.headers.Authorization = `bearer ${token}`;
        }

        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axiosInstance.interceptors.response.use(function (response) {
        // Any status code that lies within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status code that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
}
