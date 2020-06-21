import {Network} from "../../lib";

export function getStuff(
  onSuccess: (data: any) => any,
  onError: (error: string) => any,
): Promise<any> {
  const net: Network = new Network();
  net.setUrl("/secured");
  return net.execute(onSuccess, onError);
}
