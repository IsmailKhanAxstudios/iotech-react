import React from "react";

interface OverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (item: { title: string; body: string }) => void;
  initialData?: { title: string; body: string };
  onDelete?: () => void;
  isDelete?: boolean;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  initialData = { title: "", body: "" },
  onDelete,
  isDelete = false,
}) => {
  const [titleInput, setTitleInput] = React.useState(initialData.title);
  const [bodyInput, setBodyInput] = React.useState(initialData.body);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleInput && bodyInput) {
      onSubmit({ title: titleInput, body: bodyInput });
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      } transition-opacity duration-300`}
      onClick={onClose}
    >
      <div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 sm:p-8 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg shadow-lg w-full transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">{title}</h2>
        {isDelete ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this item?
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={onDelete}
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-400 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Title"
              className="p-3 border rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
              placeholder="Body"
              className="p-3 border rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap justify-end gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-400 transition"
              >
                {title === "Add Item" ? "Add Item" : "Update Item"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OverlayModal;
