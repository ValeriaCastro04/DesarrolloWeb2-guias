export const createFavoritesSlice = (set, get) =>({
    favorites: [],
    favoriteExists: (id)=>{
        return get().favorites.some(favorite => favorite.idDrink == id);
    },
    handleClickFavorite: (recipe) =>{
        if(get().favoriteExists(recipe.idDrink)){
            set((state) =>({
                favorites: state.favorites.filter(favorite => favorite.idDrink != recipe.idDrink)
            }));
        }
        else{
            set((state)=>({
                favorites: [...state.favorites, recipe]
            }));
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    loadFromStorage: ()=>{
        const storedFavorites = localStorage.getItem('favorites');
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            });
        }
    }
});