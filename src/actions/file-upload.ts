import { upload } from "@/lib/file-system";

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file uploaded");
    }
    upload.single("file");
  } catch (error) {
    throw new Error("Server actions error");
  }
}
