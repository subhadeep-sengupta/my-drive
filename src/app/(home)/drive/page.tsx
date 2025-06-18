import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    const rootFolderId = await MUTATIONS.onBoardUser(session.userId);

    return redirect(`/f/${rootFolderId}`);
  }

  return redirect(`/f/${rootFolder.id}`);

}

