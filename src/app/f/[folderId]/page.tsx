import { db } from "~/server/db";
import DriveContents from "../../drive-content";
import type { Folder } from "@prisma/client";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  async function getParentsPromise(folderId: string) {
    const parents = [];
    let currentId: string | null = folderId;
    while (currentId !== null) {
      const folder: Folder[] = await db.folder.findMany({
        where: {
          id: currentId,
        },
      });
      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0].parentId;
    }
    return parents;
  }

  const params = await props.params;
  console.log(params.folderId);
  const filesPromise = db.file.findMany({
    where: {
      parentId: params.folderId,
    },
  });
  const foldersPromise = db.folder.findMany({
    where: {
      parentId: params.folderId,
    },
  });

  const allParents = getParentsPromise(params.folderId);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    allParents,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
