import {getRecipesTag} from "@/services/api.service";
import UpdateToken from "@/components/updateToken/UpdateToken";

const RecipesTagComponent = async ({recipesTag}: { recipesTag: string }) => {

    const tags = await getRecipesTag(recipesTag);


    return (
        <div>
            <h3>Recipes with Tag</h3>
            {tags.length > 0 ? (
                <div>
                    {tags.map((recipe) => (
                        <div key={recipe.id} style={{marginBottom: "20px"}}>
                            <h4>{recipe.name}</h4>
                            <img src={recipe.image} alt={recipe.name} width="200"/>
                            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                            <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
                            <p><strong>Servings:</strong> {recipe.servings}</p>
                            <p><strong>Tags:</strong> {recipe.tags.join(", ")}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found for this tag.</p>
            )}
            <UpdateToken/>
        </div>
    );
};

export default RecipesTagComponent;