import { db } from "~/server/db";
import DriveContents from "../../drive-content";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  console.log(params.folderId);
  const files = await db.file.findMany({
    where: {
      parentId: params.folderId,
    },
  });
  const folders = await db.folder.findMany({
    where: {
      parentId: params.folderId,
    },
  });

  return <DriveContents files={files} folders={folders} />;
}
