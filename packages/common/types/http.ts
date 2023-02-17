export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export type HttpRoute = {
  path: string;
  method: HttpMethod;
  handler: string | symbol;
};
