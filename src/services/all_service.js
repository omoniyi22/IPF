import { api, attachApiToken } from "./api";
const authApi = attachApiToken(api);

//Events Service
export const getEventByMember = async (id) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/admin/${id}`)
}
export const getEventByAdmin = async (id) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/admin/events/${id}`)
}


export const getActiveEvents = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get("/events/get?status=active")
}
export const getClosedEvents = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get("/events/get?status=closed")
}
export const getAllEvents = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/events")
}

export const createEvent = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/admin/events`, { ...data })
}

export const EditEvent = async (data, id) => {
  const authApi = await attachApiToken(api);
  return authApi.patch(`/admin/events/${id}`, { ...data })
}