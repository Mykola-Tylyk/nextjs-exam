import Link from "next/link";
import './foUserPage.css'


const UserPage = () => {


    return (
        <div className={'user-page'}>
            <h2>Select <Link href={'/user/users'}>users</Link> or <Link href={'/user/recipes'}>recipes</Link></h2>
        </div>
    );
};

export default UserPage;