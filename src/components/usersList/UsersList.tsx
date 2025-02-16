//
// import {useSearchParams} from "react-router-dom";
// import {useEffect} from "react";
// import UserSingleComponent from "../userSingleComponent/UserSingleComponent.tsx";
// import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
// import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
// import {refresh} from "../../services/api.service.ts";
// import {loadUsers} from "../../redux/slices/userSlice/userSlice.ts";
// import Pagination from "../pagination/Pagination.tsx";
// import Search from "../search/Search.tsx";
// import {resetSearchResults} from "../../redux/slices/searchSlice/searchSlice.ts";
//
// const UsersList = () => {
//
//     const {users, total} = useAppSelector(({userSlice}) => userSlice);
//     const dispatch = useAppDispatch();
//     const [query] = useSearchParams({page: '1'});
//     const limit = 30;
//     useEffect(() => {
//         dispatch(resetSearchResults());
//         const page = query.get('page');
//         if (page) {
//             dispatch(loadUsers({page, limit}));
//             refresh()
//                 .then(() => dispatch(loadUsers({page, limit})))
//                 .catch((error) => console.log(error));
//         }
//     }, [dispatch, query]);


import {getResourcesUsers} from "@/services/api.service";
// import Search from "@/components/search/Search";
import UserSingleComponent from "@/components/userSingleComponent/UserSingleComponent";
import {IUser} from "@/models/IUser";
import Pagination from "@/components/pagination/Pagination";




const UsersList = async ({ currentPage }: { currentPage: number }) => {
    const page = currentPage || 1;
    console.log("PAGE:",page);
    const limit = 30;
    const data = await getResourcesUsers(page, limit);
    console.log(data);
    console.log(data.users);
    console.log(data.total);
    return (
        <div>
            {/*<Search page={'users'}/>*/}
            <hr/>
            {
                data.users.map((user:IUser) => <UserSingleComponent key={user.id} item={user}/>)
            }
            <Pagination totalPages={Math.ceil(data.total / limit)} />
        </div>
    );
};

export default UsersList;