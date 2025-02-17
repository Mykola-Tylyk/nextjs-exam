
import {getResourcesUsers} from "@/services/api.service";
import UserSingleComponent from "@/components/userSingleComponent/UserSingleComponent";
import {IUser} from "@/models/IUser";
import Search from "@/components/search/Search";




const UsersList = async ({ currentPage, limit }: { currentPage: number, limit: number }) => {
    const page = currentPage || 1;
    console.log("PAGE:",page);

    const data = await getResourcesUsers(page, limit);
    console.log(data);
    console.log(data.users);
    console.log(data.total);
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