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