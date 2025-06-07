import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";

export default function Sandbox() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      Seed Function {` `}
      <form
        action={async () => {
          "use server";

          const insertFolder = await db.folder.createMany({
            data: mockFolders.map((folder) => ({
              id: folder.id,
              name: folder.name,
              parentId: folder.parent,
              type: "folder",
            })),
            skipDuplicates: true,
          });

          console.log(insertFolder);

          const insertFile = await db.file.createMany({
            data: mockFiles.map((file) => ({
              id: file.id,
              name: file.name,
              url: file.url,
              size: 500,
              parentId: file.parent,
              type: "file" as const,
            })),
            skipDuplicates: true,
          });

          console.log(insertFile);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
