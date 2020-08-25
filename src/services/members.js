import { api, attachApiToken } from "./api";

export async function getMembers() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/get-members");
}

export async function getCompanies() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/companies");
}

export async function getMembershipTypes() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/membership-type");
}
