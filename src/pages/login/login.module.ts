import * as React from "react";

import {Network, RequestMethod} from "../../lib/";

export async function login(
  e: React.FormEvent<HTMLFormElement>,
  username: string,
  password: string,
  onSuccess: (data: any) => any,
  onError: (error: string) => any,
): Promise<any> {
  e.preventDefault();
  const net: Network = new Network();
  net.setUrl("/user/login");
  net.setMethod(RequestMethod.POST);
  net.setBody({
    username,
    password,
  });

  return net.execute(onSuccess, onError);
}
