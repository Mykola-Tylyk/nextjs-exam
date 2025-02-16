// import {useParams} from "react-router-dom";
// import {useEffect} from "react";
// import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
// import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
// import {userSliceAction} from "../../redux/slices/userSlice/userSlice.ts";
// import {refresh} from "../../services/api.service.ts";
// import RecipesList from "../../components/recipesList/RecipesList.tsx";
//
// const UserById = () => {
//
//     const {id} = useParams();
//
//     const user = useAppSelector(state => state.userSlice.user);
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         if (id) {
//             dispatch(userSliceAction.loadUser(id));
//             refresh()
//                 .then(() => dispatch(userSliceAction.loadUser(id)))
//                 .catch((error) => console.log(error))
//         }
//     }, [dispatch, id]);


import {getUser} from "@/services/api.service";

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

                    {/*<h4>User Recipes</h4>*/}
                    {/*<RecipesList userId={parseInt(id || '')} />*/}
                </div>
            }
        </div>
    );
};

export default UserById;