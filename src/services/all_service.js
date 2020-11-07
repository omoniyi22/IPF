import { api, attachApiToken } from "./api";

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


//Invite Services
export const AcceptReject = async (type, id) => {
  const authApi = await attachApiToken(api)
  return authApi.patch(`/events/invites/${id}`, { ...type })
}

export const getInvites = async (id) => {
  const authApi = await attachApiToken(api)
  return authApi.get(`/events/${id}/invites`)
}

export const sendInvites = async (data) => {
  const authApi = await attachApiToken(api)
  return authApi.post(`/admin/events/invites`, { ...data })
}

export const invitations = async () => {
  const authApi = await attachApiToken(api)
  return authApi.get(`/events/member/invites`)
}