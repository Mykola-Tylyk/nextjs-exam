'use server'


import UsersList from "@/components/usersList/UsersList";
import Pagination from "@/components/pagination/Pagination";
import {getResourcesUsers} from "@/services/api.service";
import UpdateToken from "@/components/updateToken/UpdateToken";

const UsersPage = async ({ searchParams }: { searchParams: { page?: string }} ) => {

    const currentPage = Number(searchParams.page) || 1;
    const limit = 20;
    const data = await getResourcesUsers(currentPage, limit);
    const total = data.total;
    return (
        <div>
            <UsersList data={data}/>
            <Pagination totalPages={Math.ceil(total / limit)} />
            <UpdateToken/>
        </div>
    );
};

export default UsersPage;