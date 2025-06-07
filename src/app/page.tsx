import { db } from "~/server/db";
import DriveContents from "./drive-content";

export default async function GoogleDriveClone() {
  const files = await db.file.findMany();
  const folders = await db.folder.findMany();

  return <DriveContents files={files} folders={folders} />;
}
