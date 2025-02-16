
import UsersList from "@/components/usersList/UsersList";
import Pagination from "@/components/pagination/Pagination";
import {getResourcesUsers} from "@/services/api.service";

const UsersPage = async ({ searchParams }: { searchParams: { page?: string }} ) => {
    const currentPage = Number(searchParams.page) || 1;
    const limit = 20;
    const data = await getResourcesUsers(currentPage, limit);
    const total = data.total;
    return (
        <div>
            <UsersList currentPage={currentPage} limit={limit}/>
            <Pagination totalPages={Math.ceil(total / limit)} />
        </div>
    );
};

export default UsersPage;