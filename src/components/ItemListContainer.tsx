import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, updateItem } from "@/store/itemSlice";
import { Item } from "../types";
import OverlayModal from "./OverlayModal";
import ItemDetails from "./itemDetails";
import ItemsList from "./ItemsList";

const ItemListContainer = ({ items: initialItems }: { items: Item[] }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (initialItems.length > 0) {
      setCurrentItem(initialItems[0]);
    }
  }, [initialItems]);

  const handleDelete = (id: number) => {
    setDeleteModal(true);
    setCurrentItem(items.find((item) => item.id === id) || null);
    setModalOpen(true);
  };

  const handleUpdate = (item: Item) => {
    setCurrentItem(item);
    setModalOpen(true);
    setDeleteModal(false);
  };

  const handleSubmit = (item: { title: string; body: string }) => {
    if (currentItem) {
      dispatch(updateItem({ id: currentItem.id, ...item }));
    } else {
      const newItem = { id: Date.now(), ...item };
      dispatch(addItem(newItem));
    }
    setModalOpen(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = () => {
    if (currentItem) {
      dispatch(deleteItem(currentItem.id));
      setModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <ItemDetails
        currentItem={currentItem}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      <ItemsList
        items={items}
        setCurrentItem={setCurrentItem}
        updateItemsList={setItems} // Pass down the function to update the list
      />
    </div>
  );
};

export default ItemListContainer;
