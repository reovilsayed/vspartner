import requests from "../services/httpService";
import { queryClient } from "./queryClient";

const prefetchOnMouseHover = async (key, url, parameter = '', token) => {
    await queryClient.prefetchQuery(key, () => {
        return requests.post(url, parameter, {token: token});
    });
};

export default prefetchOnMouseHover;