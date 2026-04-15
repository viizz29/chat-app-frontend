import api from "./client";

export const uploadFileApi = async (
  file: File,
  onUploadProgress?: (progress: number) => void
) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/v1/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onUploadProgress?.(percent);
    },
  });

  return res.data;
};


export const uploadUserForm = async (formData: FormData) => {
  const res = await api.post("/v1/upload-user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};