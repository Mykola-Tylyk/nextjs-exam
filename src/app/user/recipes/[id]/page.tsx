import {FC} from "react";
import RecipeById from "@/components/recipeById/RecipeById";

type PropsPageIdRecipe = {
    params: { id: string };
}


const PageIdRecipe: FC<PropsPageIdRecipe> = async ({params}) => {
    const {id} = await params;

    return (
        <div>
            <RecipeById id={id}/>
        </div>
    );
};

export default PageIdRecipe;
