import RecipesTagComponent from "@/components/recipesTagComponent/RecipesTagComponent";

const RecipesTagPage = async ({params}: {params: { tag: string }}) => {
    const recipesTag = decodeURIComponent(params.tag);
    console.log(recipesTag);
    return (
        <div>
            <RecipesTagComponent recipesTag={recipesTag}/>
        </div>
    );
};

export default RecipesTagPage;