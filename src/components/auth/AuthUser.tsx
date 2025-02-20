'use client'

import MenuForAuthUser from "@/components/menu/MenuForAuthUser";
import {useEffect, useState} from "react";
import "./AuthUser.css"
import {getAuthUser, refresh} from "@/services/api.service";
import {redirect} from "next/navigation";

const AuthUser = () => {


    const [img, setImg] = useState<string | null>(null);

    useEffect(() => {
        getAuthUser()
            .then(value => {
                setImg(value);
            })
            .catch(error => {
                console.error("Error image:", error);
                refresh()
                    .then(() => getAuthUser()
                        .then((value) => {
                            setImg(value);
                        })
                        .catch((error) => {
                            console.error("Retry failed:", error);
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
        </div>
    );
};

export default AuthUser;

