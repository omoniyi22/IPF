import { api, attachApiToken } from "./api";

export async function createCompanyCall(data) {
  const authApi = await attachApiToken(api);
  return authApi.post("/admin/add-company", data);
}

export async function getPositionCall() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/positions");
}

export async function getIndustryCall() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/industry-type");
}

export async function getClassificationCall() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/industry-classification");
}

export async function getDashboardOverview() {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/dashboard-overview");
}

export async function forgotPasswordCall(data) {
  return api.post("/auth/reset-password", data);
}

export async function resetPasswordCall(data) {
  return api.patch(`/auth/password/reset/${data.id}/${data.token}`, {
    password: data.password,
  });
}
