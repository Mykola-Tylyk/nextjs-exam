import Link from "next/link";


const UserPage = () => {


    return (
        <div>
            <h2>Select <Link href={'/user/users'}>users</Link> or <Link href={'/user/recipes'}>recipes</Link></h2>
        </div>
    );
};

export default UserPage;