
import {FC} from "react";
import Link from "next/link";
import {IRecipe} from "@/models/IRecipe";



type RecipeTypeProps = {
    item: IRecipe;
    userId?: number;
}

const RecipeSingleComponent:FC<RecipeTypeProps> = ({item, userId}) => {


    return (
        <div>
            <h4><Link href={`/user/recipes/${item.id}`}>{item.id} - {item.name}</Link></h4>
            {!userId && item.tags.map((tag, index) => <p key={tag + index}><Link href={`/user/recipes/tag/${encodeURIComponent(tag)}`}>{tag}</Link></p>)}

        </div>
    );
};

export default RecipeSingleComponent;