import Link from "next/link";

const Menu = () => {


    return (
        <div>
            <ul>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/login'}>Login</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;