import UsersList from "@/components/usersList/UsersList";

const UsersPage = () => {
const currentPage = 3

    return (
        <div>
            <UsersList currentPage={currentPage}/>
        </div>
    );
};

export default UsersPage;