import React from "react";
import store from "@/app/store/Store"; // Обновите путь, если необходимо

const StoreContext = React.createContext(store);

export const useStore = () => React.useContext(StoreContext);

export default StoreContext;