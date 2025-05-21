//TODO: Need to create an import for the connection to the DB, IDK how to do this yet

// Create a new member
export const createMember = async (memberData) => {
  const response = await api.post('/members', memberData);
  return response.data;
};

// Get a single member by ID
export const getMemberById = async (id) => {
  const response = await api.get(`/members/${id}`);
  return response.data;
};

// Update a member
export const updateMember = async (id, updatedData) => {
  const response = await api.patch(`/members/${id}`, updatedData);
  return response.data;
};

// Delete a member
export const deleteMember = async (id) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};
