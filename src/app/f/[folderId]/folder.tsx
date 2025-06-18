import { useState } from "react";
import { Button } from "~/components/ui/button";
import { createFolder } from "~/server/actions";


type Props = {
    parentId: string;
};

export default function CreateFolder({ parentId }: Props) {

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState("")

    return (
        <>
            <Button className="text-white h-10 w-36 font-normal bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800" onClick={() => setShowModal(true)}>
                Create Folder
            </Button>
            {showModal && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${showModal
                        ? 'opacity-100 visible backdrop-blur-md bg-black/40'
                        : 'opacity-0 invisible backdrop-blur-none bg-transparent'
                        }`}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className={`bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl border border-gray-700 text-white transform transition-all duration-300 ease-in-out ${showModal
                            ? 'scale-100 translate-y-0 opacity-100'
                            : 'scale-75 -translate-y-8 opacity-0'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold mb-4 text-white">New Folder</h2>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter folder name"
                            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors duration-200"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    await createFolder(name, parentId)
                                    setShowModal(false)
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"

                            >
                                Create
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>)

}