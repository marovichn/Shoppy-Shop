import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  promotions: any[];
  addItem: (data: Product) => void;
  addPromo: (data: any) => void;
  removeItem: (id: string) => void;
  removePromo: (id: string) => void;
  removeAll: () => void;
  removeAllPromos: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      promotions: [],
      addPromo: (data: any) => {
        const currentPromos = get().promotions;
        const exists = currentPromos.includes(data);
        if (exists) {
          return toast.success("This discount is already active");
        } else {
          set({ promotions: [...get().promotions, data] });
        }
      },
      removePromo: (id: string) => {
        const allPromos = get().promotions;
        set({ promotions: [allPromos.filter((promo:any)=>promo.id !== id)] });
      },
      removeAllPromos:()=>{
         set({ promotions: [] });
      },
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingSameItems = currentItems.filter(
          (item) => item.id === data.id
        );

        if (existingSameItems && existingSameItems[0]?.stockAmount) {
          if (
            Number(existingSameItems[0].stockAmount) > existingSameItems.length
          ) {
            set({ items: [...get().items, data] });
          } else {
            return toast("Whole stock of this product is in cart.");
          }
        } else {
          set({ items: [...get().items, data] });
        }
      },
      removeItem: (id: string) => {
        const allItems = get().items;
        const itemsToDeleteFiltered = allItems.filter((item) => item.id === id);
        const newCartItems = allItems.filter((item) => item.id !== id);
        if (itemsToDeleteFiltered.length === 1) {
          set({ items: [...newCartItems] });
          toast.success("Item removed from cart.");
        } else {
          const itemsOfSameTypeMinusOne = itemsToDeleteFiltered.slice(
            0,
            itemsToDeleteFiltered.length - 1
          );
          set({ items: [...newCartItems, ...itemsOfSameTypeMinusOne] });
          toast.success("Item removed from cart.");
        }
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
