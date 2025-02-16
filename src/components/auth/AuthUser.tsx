'use client'


import MenuForAuthUser from "@/components/menu/MenuForAuthUser";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import "./AuthUser.css"
import {getAuthUser, refresh} from "@/services/api.service";
import {redirect} from "next/navigation";

const AuthUser = () => {


    const [img, setImg] = useState<string | null>(null);

    useEffect(() => {
        getAuthUser()
            .then(value => {
                setImg(value);
                console.log('asd');
            })
            .catch(error => {
                console.error("Error image:", error);
                console.log('zxc');
                refresh()
                    .then(() => getAuthUser()
                        .then((value) => {
                            setImg(value);
                            console.log('qwe');
                        })
                        .catch((error) => {
                            console.error("Retry failed:", error);
                            console.log('bnm');
                            redirect('/login');
                        })).catch((error) => {
                    console.error("Refresh error", error);
                    redirect('/login');

                })

            });
    }, []);


    return (
        <div>
            <div className={'logo-menu'}>
                <MenuForAuthUser/>
                {img ? (<img className={'img-logo-menu'} src={img} alt="UserSingleComponent Avatar"/>) : ('')}
            </div>
            <hr/>
            <Outlet/>
        </div>
    );
};

export default AuthUser;

