"use client";

import { useState } from "react";
import { Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Filerow, Folderrow } from "./page-row";
import type { File, Folder } from "@prisma/client";

export default function DriveContents(props: {
  files: File[];
  folders: Folder[];
}) {
  const [currentFolder, setCurrentFolder] = useState<string>();

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== "root") {
      const folder = props.folders.find((folder) => folder.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parentId ?? "root";
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder("root")}
              variant="ghost"
              className="mr-2 text-gray-300 hover:text-white"
            >
              My Drive
            </Button>
            {getBreadcrumbs().map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <Folderrow
                key={folder.id}
                folder={folder}
                handleFolderClick={() => {
                  handleFolderClick(folder.id);
                }}
              />
            ))}
            {props.files.map((file) => (
              <Filerow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
