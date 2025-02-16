'use client'

import {FC} from "react";
import Link from "next/link";
import {IUser} from "@/models/IUser";


type UserTypeProps = {
    item: IUser
}

const UserSingleComponent: FC<UserTypeProps> = ({item}) => {


    return (
        <div>
            <Link href={`/user/users/${item.id}`}><strong>{item.id}</strong> - {item.firstName} - {item.lastName}</Link>
        </div>
    );
};

export default UserSingleComponent;