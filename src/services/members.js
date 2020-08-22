import { api, attachApiToken } from "./api";

export async function getMembers() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/get-members");
}
