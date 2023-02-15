export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export type Router = {
  path: string;
  method: HttpMethod;
  handler_name: string;
};
