import { upload } from "@/lib/file-system.ts";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return new Promise((resolve) => {
    upload.single("file")(req, {}, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return resolve(
          Response.json({ message: "File upload failed" }, { status: 500 })
        );
      }

      const { filename, path } = req.file;
      return resolve(
        Response.json({
          message: "File uploaded successfully",
          fileName: filename,
          filePath: path,
        })
      );
    });
  });
};
