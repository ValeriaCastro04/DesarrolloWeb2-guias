import { createRecipesSlice } from "./recipeSlice";
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export const useAppStore = create(devtools((...args)=>({
    ...createRecipesSlice(...args)
})))