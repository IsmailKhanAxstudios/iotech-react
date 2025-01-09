import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, updateItem } from "@/store/itemSlice";
import { Item } from "../types";
import OverlayModal from "./OverlayModal";
import ItemDetails from "./ItemDetails";
import ItemsList from "./ItemsList";

const ItemListContainer = ({ items: initialItems }: { items: Item[] }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setCurrentItem(items[0]);
    }
  }, [items]);

  const handleDelete = (id: number) => {
    const itemToDelete = items.find((item) => item.id === id);
    if (itemToDelete) {
      setCurrentItem(itemToDelete);
      setDeleteModal(true);
      setModalOpen(true);
    }
  };

  const handleUpdate = (item: Item) => {
    setCurrentItem(item);
    setDeleteModal(false);
    setModalOpen(true);
  };

  const handleSubmit = (item: { title: string; body: string }) => {
    if (currentItem) {
      const updatedItem = { id: currentItem.id, ...item };
      const updatedItems = items.map((i) =>
        i.id === currentItem.id ? updatedItem : i
      );
      setItems(updatedItems);
      dispatch(updateItem(updatedItem));
    } else {
      const newItem = { id: Date.now(), ...item };
      setItems([newItem, ...items]);
      dispatch(addItem(newItem));
    }
    setModalOpen(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = () => {
    if (currentItem) {
      const updatedItems = items.filter((item) => item.id !== currentItem.id);
      setItems(updatedItems);
      dispatch(deleteItem(currentItem.id));
      setModalOpen(false);
      setCurrentItem(updatedItems.length > 0 ? updatedItems[0] : null);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        <ItemDetails
          currentItem={currentItem}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />

        <ItemsList
          items={items}
          setCurrentItem={setCurrentItem}
          updateItemsList={setItems}
        />
      </div>
      <OverlayModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={
          isDeleteModal ? "Delete Item" : currentItem ? "Edit Item" : "Add Item"
        }
        onSubmit={handleSubmit}
        initialData={
          currentItem
            ? { title: currentItem.title, body: currentItem.body }
            : undefined
        }
        onDelete={handleDeleteItem}
        isDelete={isDeleteModal}
      />
    </>
  );
};

export default ItemListContainer;
