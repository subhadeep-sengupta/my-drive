"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

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
