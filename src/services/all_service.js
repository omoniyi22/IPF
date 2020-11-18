import { api, attachApiToken } from "./api";

//Events Service
export const getEventByMember = async (id) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/admin/${id}`);
};
export const getEventByAdmin = async (id) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/admin/events/${id}`);
};

export const getActiveEvents = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get("/events/get?status=active");
};
export const getClosedEvents = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get("/events/get?status=closed");
};
export const getAllEvents = async () => {
  console.log("knsd;ns");
  const authApi = await attachApiToken(api);
  return authApi.get("/admin/events");
};

export const createEvent = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/admin/events`, { ...data });
};

export const EditEvent = async (data, id) => {
  const authApi = await attachApiToken(api);
  return authApi.patch(`/admin/events/${id}`, { ...data });
};

//Invite Services
export const AcceptReject = async (type, id) => {
  const authApi = await attachApiToken(api);
  return authApi.patch(`/events/invites/${id}`, { ...type });
};

export const getInvites = async (id) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/events/${id}/invites`);
};

export const sendInvites = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/admin/events/invites`, { ...data });
};

export const invitations = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/events/member/invites`);
};

//Question Services
export const postQue = async (event_id, question) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/questions/event`, { event_id, question });
};
export const editQue = async (questionId, question) => {
  const authApi = await attachApiToken(api);
  return authApi.patch(`/questions/events/${questionId}`, { question });
};

export const getQues = async (eventId) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/questions/${eventId}/events`);
};

export const getQue = async (questionId) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/questions/${questionId}/events`);
};

// Fees
export const getFee = async (feeId) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/fees/${feeId}`);
};

export const getFees = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/fees`);
};

export const editFee = async (feeId) => {
  const authApi = await attachApiToken(api);
  return authApi.patch(`/fees/${feeId}`);
};

export const CreateFee = async (feeId) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/fees/${feeId}`);
};

// Payment
export const PaidDetails = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/payments/member/transactions`);
};

export const Pay = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/payments/fees`, data);
};

export const listcard = async () => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/cards/member/cards`);
};


//Comments
export const get_all_comment = async (question_id) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/comments/questions/${question_id}`);
}

export const post_comment = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`comments/question`, data);
}