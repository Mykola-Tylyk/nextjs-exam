import {getResourcesRecipes} from "@/services/api.service";
import {IRecipe} from "@/models/IRecipe";
import RecipeSingleComponent from "@/components/recipeSingleComponent/RecipeSingleComponent";
import Search from "@/components/search/Search";

const RecipesList = async ({ currentPage, limit, userId }: { currentPage: number, limit: number, userId?: number }) => {
    const page = currentPage || 1;
    const data = await getResourcesRecipes(page, limit);

    const filteredRecipes = userId ? data.recipes.filter((recipe) => recipe.userId === userId) : data.recipes;


    return (
        <div>
            {userId ? '' : <Search page={'recipe'}/>}
            <hr/>
            {
                filteredRecipes.map((recipe:IRecipe) => (<RecipeSingleComponent key={recipe.id} item={recipe} userId={userId}/>))
            }
        </div>
    );
};

export default RecipesList;