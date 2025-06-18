import "server-only";

import type { Folder } from "@prisma/client";
import { db } from "./db";

export const QUERIES = {
  getAllParentsForFolders: async function (folderId: string) {
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
  },

  getFiles: function (folderId: string) {
    const filesPromise = db.file.findMany({
      where: {
        parentId: folderId,
      },
      orderBy: {
        name: "asc",
      },
    });
    return filesPromise;
  },

  getFolders: function (folderId: string) {
    const foldersPromise = db.folder.findMany({
      where: {
        parentId: folderId,
      },
      orderBy: {
        name: "asc",
      },
    });
    return foldersPromise;
  },

  getFolderId: async function (folderId: string) {
    const folder = await db.folder.findMany({
      where: {
        id: folderId,
      },
    });
    return folder[0];
  },

  getRootFolderForUser: async function (userId: string) {
    const rootFolder = await db.folder.findFirst({
      where: {
        ownerId: userId,
        parentId: null,
      },
    });

    return rootFolder;
  },
};

export const MUTATIONS = {
  createFile: async function (
    data: {
      name: string;
      type: string;
      size: number;
      url: string;
      parentId: string;
      ownerId: string;
    },
    userId: string,
  ) {
    return await db.file.create({
      data: data,
    });
  },
  onBoardUser: async function (userId: string) {
    const rootFolder = await db.folder.create({
      data: {
        name: "root",
        ownerId: userId,
        type: "folder",
        parentId: null,
      },
    });
    const rootFolderId = rootFolder.id;

    await db.folder.createMany({
      data: [
        {
          name: "Trash",
          ownerId: userId,
          type: "folder",
          parentId: rootFolderId,
        },
        {
          name: "Documents",
          ownerId: userId,
          type: "folder",
          parentId: rootFolderId,
        },
        {
          name: "Images",
          ownerId: userId,
          type: "folder",
          parentId: rootFolderId,
        },
      ],
    });

    return rootFolderId;
  },
  createFolder: async function(data: {
    name:string,
    type:string,
    ownerId:string,
    parentId:string
  }) {
   return await db.folder.create({
      data: data
    })
  
  }
};
