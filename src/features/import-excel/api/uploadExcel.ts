import { api } from "@/shared/api/endpoints";

export const uploadExcelRequest = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/excel/upload", formData);

  return data;
};
