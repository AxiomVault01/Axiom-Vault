export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

// Anyone signed in who isn't the workspace super admin uses the team member area
export const isTeamMember = (user = getStoredUser()) =>
  Boolean(user?.role) && user.role !== "super_admin";
