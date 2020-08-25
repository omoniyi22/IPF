import { api, attachApiToken } from "./api";

export async function assignPosition(data) {
  const authApi = await attachApiToken(api);
  return authApi.patch("/admin/assign-role", data);
}

// export async function removePosition(data) {
//   const authApi = await attachApiToken(api);
//   return authApi.patch("/admin/assign-role", {
//     userId: data.userId,
//     role: data.position,
//   });
// }
