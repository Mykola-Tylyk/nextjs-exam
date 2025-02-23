'use server'

import UserSingleComponent from "@/components/userSingleComponent/UserSingleComponent";
import {IUser} from "@/models/IUser";
import Search from "@/components/search/Search";
import {IUsersResponse} from "@/models/IUsersResponse";


const UsersList = async ({ data }: { data: IUsersResponse }) => {


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