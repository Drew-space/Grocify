import { create } from "zustand";
import Constants from "expo-constants";

const localhost = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
export const API_URL = __DEV__ ? `http://${localhost}:8081` : "";

export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Bakery"
  | "Pantry"
  | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api`);
      const payload = (await res.json()) as ItemsResponse;

      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      set({ items: payload.items });
    } catch (error) {
      console.log("Error loading items:", error);
      set({ error: "something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },
  addItem: async (input) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api`, {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });

      const payload = (await res.json()) as ItemResponse;
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      set((state) => ({ items: [payload.item, ...state.items] }));
      return payload.item;
    } catch (error) {}
  },
  updateQuantity: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });

    try {
      const res = await fetch(`${API_URL}/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      const payload = (await res.json()) as ItemResponse;
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
      set({ error: "Something went wrong" });
    }
  },
  togglePurchased: async (id) => {
    const currentItem = get().items.find((item) => item.id === id);
    if (!currentItem) return;

    const nextPurchased = !currentItem.purchased;
    set({ error: null });
    try {
      const res = await fetch(`${API_URL}/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchased: nextPurchased }),
      });

      const payload = (await res.json()) as ItemResponse;
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.error("Error toggling purchased:", error);
      set({ error: "Something went wrong" });
    }
  },
  removeItem: async (id) => {
    set({ error: null });
    try {
      const res = await fetch(`${API_URL}/api/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error removing item:", error);
      set({ error: "Something went wrong" });
    }
  },
  clearPurchased: async () => {
    set({ error: null });
    try {
      const res = await fetch(`${API_URL}/api/items/clear-purchased`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const items = get().items.filter((item) => !item.purchased);
      set({ items });
    } catch (error) {
      console.error("Error clearing purchased:", error);
      set({ error: "Something went wrong" });
    }
  },
}));
