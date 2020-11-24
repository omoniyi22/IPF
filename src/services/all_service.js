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


export const DeleteEvent = async (id) => {
  const authApi = await attachApiToken(api);
  return authApi.delete(`/admin/events/${id}/delete`);
};




export const CloseEvent = async (data, id) => {

  const authApi = await attachApiToken(api);
  return authApi.patch(`/admin/events/${id}/delete`, { ...data });
}



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

export const sendMemInvites = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/events/members/invites`, { ...data });
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



export const getArchives = async (event_id) => {
  const authApi = await attachApiToken(api);
  return authApi.get(`/questions/${event_id}/archives`);
};



export const postArchieve = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/questions/archive`, data)
}

// Like
export const Like = async (data) => {
  const authApi = await attachApiToken(api);
  return authApi.post(`/questions/like`, data)
}

export const noOFmem = async (id, no) => {
  try {
    let authApi = await attachApiToken(api);
    authApi = await authApi.get(`/events/members/${id}/number`)
    authApi = await authApi.data
    authApi = await authApi.data
    no.setState({ no: await authApi.number_of_members })
  } catch (error) {
    no.setState({ no: 0 })
  }
}

//