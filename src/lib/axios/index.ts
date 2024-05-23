import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_SERVER_URL, timeout: 1000, headers: {
      Authorization: `Bearer token`
    }
});

type reqMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
const timeout:number = 10000; // 10 seconds

const axiosReqSender = (method:reqMethod, url:string ,data?:object, headers?:object, params?:object) => {
    switch (method) {
        case "GET":
            return instance.get(url, {params, headers, timeout});
        case "POST":
            return instance.post(url, data, {headers, timeout});
        case "PUT":
            return instance.put(url, data, {headers, timeout});
        case "DELETE":
            return instance.delete(url, {headers, timeout});
        case "PATCH":
            return instance.patch(url, data, {headers, timeout});
        default:
            throw new Error("Invalid method");
    }
}

export default axiosReqSender;


