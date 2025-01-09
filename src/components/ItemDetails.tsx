"use client";
import React from "react";
import { Item } from "../types";
interface ItemDetailsProps {
  currentItem: Item | null;
  handleUpdate: (item: Item) => void;
  handleDelete: (id: number) => void;
  isLoading?: boolean;
  error?: string;
}

const ItemDetails = ({
  currentItem,
  handleUpdate,
  handleDelete,
  isLoading = false,
  error = "",
}: ItemDetailsProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-xl text-gray-600">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[70%] max-w-4xl h-[80vh] mx-auto border border-gray-300 p-8 rounded-lg shadow-lg bg-white text-gray-900 transition-transform transform">
      {currentItem ? (
        <>
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            {currentItem.title}
          </h3>
          <p className="text-gray-700 mb-6">{currentItem.body}</p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => handleUpdate(currentItem)}
              className="bg-blue-700 text-white py-2 px-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all shadow-md active:scale-95"
              aria-label={`Edit ${currentItem.title}`}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(currentItem.id)}
              className="bg-red-700 text-white py-3 px-8 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all shadow-md active:scale-95"
              aria-label={`Delete ${currentItem.title}`}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <p className="text-xl text-gray-600 flex items-center justify-center">
          Loading.....
        </p>
      )}
    </div>
  );
};

export default React.memo(ItemDetails);
