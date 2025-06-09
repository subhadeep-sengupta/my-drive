import DriveContents from "../../drive-content";
import { QUERIES } from "../../../server/queries";

export default async function MyDrive(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(params.folderId),
    QUERIES.getFiles(params.folderId),
    QUERIES.getAllParentsForFolders(params.folderId),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
