import {getUser} from "@/services/api.service";
import RecipesList from "@/components/recipesList/RecipesList";
import UpdateToken from "@/components/updateToken/UpdateToken";

const UserById = async ({id}: {id: string}) => {


    const user = await getUser(id);

    return (
        <div>
            {
                user &&
                <div>
                    <p><strong>id</strong> - {user.id}</p>
                    <p><strong>username</strong> - {user.username}</p>
                    <p><strong>first name</strong> - {user.firstName}</p>
                    <p><strong>last name</strong> - {user.lastName}</p>
                    <p><strong>email</strong> - {user.email}</p>
                    <p><strong>age</strong> - {user.age}</p>
                    <p><strong>birth date</strong> - {user.birthDate}</p>
                    <p><strong>height</strong> - {user.height}</p>
                    <p><strong>gender</strong> - {user.gender}</p>
                    <p><strong>eye color</strong> - {user.eyeColor}</p>

                    <h4>User Recipes</h4>
                    <RecipesList userId={parseInt(id || '')} currentPage={1} limit={0} />
                </div>
            }
            <UpdateToken/>
        </div>
    );
};

export default UserById;