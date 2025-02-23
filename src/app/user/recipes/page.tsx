import RecipesList from "@/components/recipesList/RecipesList";
import {getResourcesRecipes} from "@/services/api.service";
import Pagination from "@/components/pagination/Pagination";
import UpdateToken from "@/components/updateToken/UpdateToken";

const RecipesPage = async ({searchParams}: {searchParams: { page?: string}}) => {

    const currentPage = Number(searchParams.page) || 1;
    const limit = 10;
    const data = await getResourcesRecipes(currentPage, limit);
    const total = data.total;

    return (
        <div>
            <RecipesList currentPage={currentPage} limit={limit}/>
            <Pagination totalPages={Math.ceil(total / limit)} />
            <UpdateToken/>
        </div>
    );
};

export default RecipesPage;