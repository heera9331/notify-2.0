import fs from "fs";

/**
 * Ensures a directory exists, and creates it if it doesn't.
 * @param {string} dirPath - The path of the directory to ensure.
 */
const ensureDirectory = async (dirPath) => {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error("Error ensuring directory:", err);
  }
};

/**
 * Generates a folder path for uploads based on the year and month.
 * This works without using the 'path' module.
 * @returns {string} The generated folder path.
 */
const getUploadFolderPath = async () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const folderPath = `uploads/${year}/${month}`;
  await ensureDirectory(folderPath);

  return folderPath;
};

/**
 * Saves a file buffer to the specified folder.
 * Compatible with environments that do not support the 'path' module.
 * @param {Buffer} fileData - The file data as a Buffer.
 * @param {string} originalFileName - The original name of the uploaded file.
 * @returns {string} The relative path where the file was saved.
 */
const uploadFile = async (fileData, originalFileName) => {
  const folderPath = await getUploadFolderPath();
  const timestamp = Date.now();
  const ext = originalFileName.split(".").pop();
  const baseName = originalFileName
    .split(".")
    .slice(0, -1)
    .join(".")
    .replace(/\s+/g, "-");
  const finalFileName = `${baseName}-${timestamp}.${ext}`;
  const filePath = `${folderPath}/${finalFileName}`;

  try {
    await fs.promises.writeFile(filePath, fileData);
    return filePath;
  } catch (err) {
    console.error("Error saving file:", err);
    throw new Error("Failed to save file");
  }
};

export { uploadFile };
