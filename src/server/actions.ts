"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { MUTATIONS } from "./queries";
import { revalidatePath } from "next/cache";

const utapi = new UTApi();

export async function deleteFile(fileId: string) {
  const session = await auth();

  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  const [file] = await db.file.findMany({
    where: {
      id: fileId,
      ownerId: session.userId,
    },
  });

  if (!file) {
    return { error: "File not found" };
  }

  const utapiResult = await utapi.deleteFiles([
    file.url.replace("https://nzq5togncv.ufs.sh/f", ""),
  ]);

  console.log(utapiResult);

  const deleteResult = await db.file.delete({
    where: {
      id: fileId,
    },
  });

  console.log(deleteResult);

  const c = await cookies();

  c.set("force refresh", JSON.stringify(Math.random()));

  return { success: true };
}


export  async function createFolder(name:string, parentId: string ) {
  const session = await auth()

  if(!session.userId) {
    throw new Error("Unauthorized")
  }

  const folder = MUTATIONS.createFolder({
    name: name,
    parentId: parentId,
    type: "folder",
    ownerId: session.userId
  })
  revalidatePath(`/f/${parentId}`)
  return folder

}

export async function deleteFolder(folderId: string) {

 const session = await auth();

  if (!session.userId) {
    throw new Error("Unauthorized");
  }

const deleteResult = await db.$transaction(async (tx) => {
      // First, get all descendant folder IDs recursively
      const getAllDescendantIds = async (parentId: string): Promise<string[]> => {
        const children = await tx.folder.findMany({
          where: { parentId },
          select: { id: true }
        });
        
        let allIds = children.map(child => child.id);
        
        // Recursively get children of children
        for (const child of children) {
          const grandChildren = await getAllDescendantIds(child.id);
          allIds = allIds.concat(grandChildren);
        }
        
        return allIds;
      };

      // Get all descendant folder IDs
      const descendantIds = await getAllDescendantIds(folderId);
      const allFolderIds = [folderId, ...descendantIds];

      // Delete all files in all these folders
      const deletedFiles = await tx.file.deleteMany({
        where: {
          parentId: {
            in: allFolderIds
          }
        }
      });

      // Delete all folders (children first, then parent)
      const deletedFolders = await tx.folder.deleteMany({
        where: {
          id: {
            in: allFolderIds
          }
        }
      });

      return { deletedFiles, deletedFolders };
    });
    
    console.log('Delete result:', deleteResult);

    const c = await cookies();
    c.set("force refresh", JSON.stringify(Math.random()));

    return { success: true, message: 'Folder deleted successfully' };
  }
