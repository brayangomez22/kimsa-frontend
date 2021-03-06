export const RESOURCE_URL = {
  createAdmin: `/admin`,
  loginAdmin: `/users/login`,
  createPartner: `/partners`,
  createProject: `/projects`,
  getAllPartners: `/partners`,
  getAllProjects: `/projects`,
  getProjectsPaginated: `/projects/pagination`,
  images: '/images',
  getPartnerById: (userId: string) => `/partners/${userId}`,
  getProjectById: (projectId: string) => `/projects/${projectId}`,
  deletePartner: (userId: string) => `/partners/${userId}`,
  deleteProject: (projectId: string) => `/projects/${projectId}`,
  editProject: (projectId: string) => `/projects/${projectId}`,
  editPartner: (userId: string) => `/partners/${userId}`,
  deleteImage: (imageId: string) => `/images/${imageId}`,
};
