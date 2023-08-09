import { Product } from "@/types";
import { FC } from "react";
import { create } from "zustand";

interface usePreviewModalProps {
  isOpen: boolean;
  data?: Product;
  onOpen: (data: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<usePreviewModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product) => set({ data: data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
