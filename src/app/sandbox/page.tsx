import { db } from "~/server/db";
import { mockFolders } from "~/lib/mock-data";
import { auth } from "@clerk/nextjs/server";

export default async function Sandbox() {
  const user = await auth();

  if (!user.userId) {
    throw new Error("User not found!");
  }

  const folders = await db.folder.findMany({
    where: {
      ownerId: user.userId,
    },
  });

  console.log(folders);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      Seed Function {` `}
      <form
        action={async () => {
          "use server";

          const user = await auth();

          if (!user.userId) {
            throw new Error("User not found");
          }

          const rootFolder = await db.folder.create({
            data: {
              name: "root",
              ownerId: user.userId,
              type: "folder",
              parentId: null,
            },
          });

          const rootFolderId = rootFolder.id;

          const insertableFolder = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parentId: rootFolderId,
            type: "folder",
          }));

          await db.folder.createMany({ data: insertableFolder });

          // console.log(insertFolder);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
