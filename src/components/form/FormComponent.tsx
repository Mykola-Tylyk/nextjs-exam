'use client'
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {IFormProps} from "@/models/IFormProps";
import userValidator from "@/validators/user. validator";
import {login} from "@/services/api.service";



const FormComponent = () => {

    const {handleSubmit, register, formState: {errors, isValid}} = useForm<IFormProps>({mode: 'all', resolver:joiResolver(userValidator)});
    const customHandler = (formDataProps: IFormProps) => {
        const updatedData = { ...formDataProps, expiresInMins: 60 }
        login(updatedData).then(value => {
            console.log(value)
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit(customHandler)}>
                <label>
                    <div><input type="text" placeholder={"username"} {...register('username')}/></div>
                    {errors.username && <div>{errors.username.message}</div>}
                </label>
                <label>
                    <div><input type="password" placeholder={"password"} {...register('password')}/></div>
                    {errors.password && <div>{errors.password.message}</div>}
                </label>
                <button disabled={!isValid}>send</button>
            </form>
        </div>
    );
};

export default FormComponent;