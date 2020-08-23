import { api, attachApiToken } from "./api";

export async function addPlatformAdmin(data) {
  const authApi = await attachApiToken(api);
  return authApi.post(`/api/v1/admin/`, {
    memberNumber: data.memberNumber,
    position: data.position,
  });
}

export async function removeMemberPlatformAdmin(data) {
  const authApi = await attachApiToken(api);
  return authApi.delete(`/api/v1/admin/`, {
    data: {
      userId: data.memberId,
    },
  });
}
