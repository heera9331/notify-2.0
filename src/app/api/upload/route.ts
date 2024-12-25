import { uploadFile } from "@/lib/file-system";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      throw new Error("File is required and must be a valid instance.");
    }

    const savedPath = await uploadFile(file, file.name);
    return NextResponse.json({
      message: "File uploaded successfully",
      path: savedPath,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};
