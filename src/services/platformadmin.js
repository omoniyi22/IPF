import { api, attachApiToken } from "./api";

export async function addPlatformAdmin(data) {
  const authApi = await attachApiToken(api);
  return authApi.post(`/admin/`, {
    memberNumber: data.memberNumber,
    position: data.position,
  });
}

export async function removeMemberPlatformAdmin(data) {
  const authApi = await attachApiToken(api);
  return authApi.delete(`/admin/`, {
    data: {
      userId: data.member_id,
    },
  });
}
