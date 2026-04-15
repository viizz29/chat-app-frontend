import { http, HttpResponse } from "msw";

export const uploadFile = http.post("/api/v1/upload", async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("file") as File;

  if (!file) {
    return HttpResponse.json(
      { message: "No file uploaded" },
      { status: 400 }
    );
  }

  return HttpResponse.json({
    message: "File uploaded successfully",
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  });
});



export const uploadUserHandler = http.post(
  "/api/v1/upload-user",
  async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const photo = formData.get("photo") as File;
    const zip = formData.get("zip") as File;

    // ❌ Basic validation
    if (!name || !email || !photo || !zip) {
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ❌ Email validation
    if (!email.includes("@")) {
      return HttpResponse.json(
        { message: "Invalid email" },
        { status: 400 }
      );
    }

    // ❌ File validation
    if (!photo.type.startsWith("image/")) {
      return HttpResponse.json(
        { message: "Photo must be an image" },
        { status: 400 }
      );
    }

    if (!["application/zip",  "application/x-zip-compressed"].includes(zip.type)) {
      return HttpResponse.json(
        { message: "ZIP file invalid" },
        { status: 400 }
      );
    }

    // ⏳ Simulate delay
    await new Promise((res) => setTimeout(res, 1000));

    // ✅ Success response
    return HttpResponse.json({
      message: "Upload successful",
      user: {
        name,
        email,
      },
      files: {
        photo: {
          name: photo.name,
          size: photo.size,
          type: photo.type,
        },
        zip: {
          name: zip.name,
          size: zip.size,
          type: zip.type,
        },
      },
    });
  }
);

export const handlers = [
  uploadFile,
  uploadUserHandler
];