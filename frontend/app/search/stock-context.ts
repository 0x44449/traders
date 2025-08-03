import { create } from 'zustand';

interface StockState {
  reset: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

interface StockAction {

}

const useStockStore = create<StockState & StockAction>((set, get, store) => ({
  reset: () => set(store.getInitialState()),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isSearching: false,
  setIsSearching: (isSearching) => set({ isSearching }),
}));

export default useStockStore;