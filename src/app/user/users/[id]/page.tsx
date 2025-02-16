import {FC} from "react";
import UserById from "@/components/userById/UserById";

type PropsPageIdUser = {
    params: { id: string };
}

const PageIdUser: FC<PropsPageIdUser> = async ({params}) => {
    const {id} = await params;

    return (
        <div>
            <UserById id={id}/>
        </div>
    );
};

export default PageIdUser;