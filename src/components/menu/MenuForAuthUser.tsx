import Link from "next/link";


const MenuForAuthUser = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href={'/user/users'}>Users</Link>
                </li>
                <li>
                    <Link href={'/user/recipes'}>Recipes</Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuForAuthUser;