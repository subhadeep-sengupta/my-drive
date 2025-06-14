"use client";

import { ChevronRight } from "lucide-react";
import { Filerow, Folderrow } from "./file-row";
import type { File, Folder } from "@prisma/client";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadThing";
import { useRouter } from "next/navigation";

export default function DriveContents(props: {
  files: File[];
  folders: Folder[];
  parents: Folder[];
  currentFolderId: string;
}) {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/f/root`}
              className="mr-2 text-gray-300 hover:text-white"
            >
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="">
            <SignedOut>
              <SignInButton />
              {/* <SignUpButton /> */}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
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
              <Folderrow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <Filerow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <UploadButton
          endpoint="driveUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            navigate.refresh();
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          input={{
            folderId: props.currentFolderId,
          }}
        />
      </div>
    </div>
  );
}
