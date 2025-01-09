import React, { useState } from "react";
import { Item } from "../types";

interface ItemsListProps {
  items: Item[];
  setCurrentItem: (item: Item) => void;
  updateItemsList: (updatedItems: Item[]) => void;
}

const ItemsList = ({
  items,
  setCurrentItem,
  updateItemsList,
}: ItemsListProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleReadMore = (item: Item) => {
    setCurrentItem(item);
    const updatedItems = items.filter((i) => i.id !== item.id);
    updateItemsList(updatedItems);
  };

  return (
    <div className="w-full lg:w-[30%] h-[80vh] bg-slate-50 px-4 py-4 rounded-lg shadow-lg flex flex-col overflow-hidden">
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title"
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-y-auto flex-1 overflow-x-hidden space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleReadMore={handleReadMore}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No items found</p>
        )}
      </div>
    </div>
  );
};

const ItemCard = ({
  item,
  handleReadMore,
}: {
  item: Item;
  handleReadMore: (item: Item) => void;
}) => {
  return (
    <div
      className="border border-gray-200 p-4 mb-4 rounded-lg shadow-md bg-white hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer transform  mr-2"
      aria-label={`View details for ${item.title}`}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
        {item.title}
      </h3>
      <p className="text-gray-700 text-sm mb-4 truncate">{item.body}</p>
      <button
        onClick={() => handleReadMore(item)}
        className="text-blue-600 hover:text-blue-800 transition-all"
        aria-label={`Read more about ${item.title}`}
      >
        Read More
      </button>
    </div>
  );
};

export default React.memo(ItemsList);
