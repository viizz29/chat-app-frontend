import { http, HttpResponse } from "msw";


interface Student {
  id: number;
  name: string;
  gender: string;
  marks: number;
  serial_number: number;
}


const students: Student[] = [...Array(100).keys()].map((num, index) => ({
  id: index + 1,
  name: `student${index + 1}`,
  gender: index % 3 == 0 ? "male" : "female",
  marks: Math.floor(Math.random() * 100),
  serial_number: index + 1
}));


// // 📄 GET students
// const getStudents = http.get("/api/v1/students", () => {
//   return HttpResponse.json(students);
// });



// Example students array
// const students: Student[] = [...]

const getStudents = http.get("/api/v1/students", ({ request }) => {
  const url = new URL(request.url);

  const name = url.searchParams.get("name")?.toLowerCase() || "";

  // simulate delay
  // await new Promise((res) => setTimeout(res, 500));

  const filtered = students.filter((student) =>
    student.name.toLowerCase().includes(name)
  );

  // Get query params with defaults
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedData = filtered.slice(start, end);

  return HttpResponse.json({
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  });
});


const getStudentById = http.get("/api/v1/students/:id", ({ params }) => {

  const id = Number(params.id);

  if (id > 0 && id < students.length)
    return HttpResponse.json(students[id - 1]);
  else
    return HttpResponse.json({});
});


// ➕ CREATE todo
const reorderStudents = http.post("/api/v1/students/reorder", async ({ request }) => {
  const body = await request.json() as { title: string };

  return HttpResponse.json(body);
});


export const handlers = [
  getStudents,
  getStudentById,
  reorderStudents,
];