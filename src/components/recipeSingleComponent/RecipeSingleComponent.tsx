import {Link} from "react-router-dom";
import {FC} from "react";
import {IRecipe} from "../../models/IRecipe.ts";


type RecipeTypeProps = {
    item: IRecipe;
    userId?: number;
}

const RecipeSingleComponent:FC<RecipeTypeProps> = ({item, userId}) => {


    return (
        <div>
            <h4><Link to={`${item.id}`}>{item.id} - {item.name}</Link></h4>
            {!userId && item.tags.map((tag, index) => <p key={tag + index}><Link to={`details?tag=${encodeURIComponent(tag)}`}>{tag}</Link></p>)}

        </div>
    );
};

export default RecipeSingleComponent;