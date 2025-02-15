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
import Pagination from "@/components/pagination/Pagination";




const UsersList = async ({ searchParams }: { searchParams?: { page?: string } }) => {
    const page = searchParams?.page || '1';
    const limit = 30;
    const {users, total} = await getResourcesUsers(page, limit);

    return (
        <div>
            {/*<Search page={'users'}/>*/}
            <hr/>
            {
                users.map((user) => <UserSingleComponent key={user.id} item={user}/>)
            }
            <Pagination totalPages={Math.ceil(total / limit)} />
        </div>
    );
};

export default UsersList;