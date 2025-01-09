import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../types";
interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    fetchItemsStart(state) {
      state.loading = true;
    },
    fetchItemsSuccess(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchItemsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    updateItem(state, action: PayloadAction<Item>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItem,
  updateItem,
  deleteItem,
} = itemsSlice.actions;

export default itemsSlice.reducer;
