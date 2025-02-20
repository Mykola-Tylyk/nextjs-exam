'use server'


import {getResourcesUsers} from "@/services/api.service";
import UserSingleComponent from "@/components/userSingleComponent/UserSingleComponent";
import {IUser} from "@/models/IUser";
import Search from "@/components/search/Search";




const UsersList = async ({ currentPage, limit }: { currentPage: number, limit: number }) => {
    const page = currentPage || 1;


    const data = await getResourcesUsers(page, limit);

    return (
        <div>
            <Search page={'users'}/>
            <hr/>
            {
                data.users.map((user:IUser) => <UserSingleComponent key={user.id} item={user}/>)
            }

        </div>
    );
};

export default UsersList;