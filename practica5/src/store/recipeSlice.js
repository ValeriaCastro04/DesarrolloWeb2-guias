import { getCategories, getRecipes } from "../services/RecipeService"

export const createRecipesSlice = (set) =>({
    categories:[],
    drinks:[],
    fetchCategories: async () =>{
        const categories = await getCategories()
        set({categories})
    },
    searchRecipes: async (filters)=>{
        const drinks= await getRecipes(filters)
        set({drinks})
    }
})