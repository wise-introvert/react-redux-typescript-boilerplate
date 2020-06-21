import axios, {AxiosRequestConfig} from "axios";

import {config, RequestMethod, Param} from "../../";

export default class Network {
  onSuccess: any;
  onError: any;
  subUrl: string = "";
  url: string = config.constants.baseUrl;
  method: RequestMethod = RequestMethod.GET;
  body: any = {};
  config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  setParams = (params: Param[]): void => {
    params.map((param: Param) => {
      this.subUrl +=
        this.subUrl.length <= 0
          ? `?${param.key}=${param.value}`
          : `&${param.key}=${param.value}`;
    });
  };

  setParam = (param: Param): void => {
    this.subUrl +=
      this.subUrl.length <= 0
        ? `?${param.key}=${param.value}`
        : `&${param.key}=${param.value}`;
  };

  setMethod = (method: RequestMethod): void => {
    this.method = method;
  };

  setUrl = (url: string): void => {
    if (url.startsWith("http") || url.startsWith("localhost")) {
      this.url = url;
    } else {
      if (!this.url.includes(url)) {
        this.url += url;
      }
    }
  };

  setBody = (body: any): void => {
    if (typeof body != "object") {
      throw new Error("Request Payload should be a valid JSON object");
    }
    this.body = body;
  };
}
