import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import type { File, Folder } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";

export function Filerow(props: { file: File }) {
  const { file } = props;
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={file.url}
            target="_blank"
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">{"File"}</div>
        <div className="col-span-2 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400" aria-label="Delete file">
          <Button variant="ghost" onClick={() => deleteFile(file.id)}>
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function Folderrow(props: { folder: Folder }) {
  const { folder } = props;
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">
          {folder.type === "folder" ? "Folder" : "File"}
        </div>
        <div className="col-span-2 text-gray-400">
          {folder.type === "folder" ? "--" : "2 MB"}
        </div>
        <div className="col-span-1 text-gray-400" aria-label="Delete file">
          <Button variant="ghost" onClick={() => alert(`Folder delete triggered`)}>
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}
