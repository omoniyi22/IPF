import { api, attachApiToken } from "./api";

export async function createCompanyCall(data) {
  const authApi = await attachApiToken(api);
  return authApi.post("/admin/add-company", data);
}
