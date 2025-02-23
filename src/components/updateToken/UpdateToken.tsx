'use client'

import {useEffect} from "react";
import {refresh} from "@/services/api.service";

const UpdateToken = () => {

    useEffect(() => {
        refresh().then()
    }, []);

    return (
        <>

        </>
    );
};

export default UpdateToken;