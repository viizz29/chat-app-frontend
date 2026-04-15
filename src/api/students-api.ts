import api from "./client";



export interface StudentRecord {
  id: number;
  name: string;
  gender: string;
  marks: number;
  serial_number: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const getStudents = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{ data: StudentRecord[], pagination: Pagination }> => {
  const res = await api.get(`/v1/students?page=${page}&limit=${limit}`);
  return res.data;
};


export const getStudentById = async (id: string) => {
  const res = await api.get(`/v1/students/${id}`);
  return res.data;
};


export const updateStudentsOrder = async (students: StudentRecord[]) => {
  return api.post("/v1/students/reorder", { students });
};


export const getFirst10Students = async (): Promise<StudentRecord[]> => {
  const res = await api.get(`/v1/students?page=${1}&limit=${10}`);
  return res.data.data;
};

export const searchStudents = async (query: string): Promise<StudentRecord[]> => {
  if (!query.trim()) return [];
  const res = await api.get(`/v1/students?name=${encodeURIComponent(query)}`);
  return res.data.data;
};

export const fetchStudentListPage = async ({ pageParam = 1 }) => {
  return await getStudents({ page: pageParam, limit: 10 });
};
