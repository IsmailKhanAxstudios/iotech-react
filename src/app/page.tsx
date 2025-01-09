"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
} from "@/store/itemSlice";
import { fetchItems } from "../utils/apiService";

import { RootState } from "../store";
import ItemListContainer from "../components/ItemListContainer";

const Page = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchItemsStart());
      try {
        const data = await fetchItems();
        dispatch(fetchItemsSuccess(data));
      } catch (err: any) {
        dispatch(fetchItemsFailure(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">IoTech - Articles</h1>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ItemListContainer items={items} />
      )}
    </div>
  );
};

export default Page;
