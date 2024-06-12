const baseURL = "http://localhost:5000";

export const apiEndpoints = {
  login: `${baseURL}/api/auth/login`,
  signup: `${baseURL}/api/auth/signUp`,
  uploadFile: `${baseURL}/api/files/upload-files`,
  getFiles: `${baseURL}/api/files/get-files`,
  getFile: `${baseURL}/api/files/get-file`,
};
