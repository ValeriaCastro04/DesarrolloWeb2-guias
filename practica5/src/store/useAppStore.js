import { createRecipesSlice } from "./recipeSlice";
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import { createFavoritesSlice } from "./favoritesSlice";

export const useAppStore = create(devtools((...args)=>({
    ...createRecipesSlice(...args),
    ...createFavoritesSlice(...args)
})))