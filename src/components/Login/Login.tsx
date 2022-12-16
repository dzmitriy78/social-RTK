import {ErrorMessage, Field, Form, Formik} from "formik";
import {loginFormSchema} from "../form/formValidation/loginFormSchema";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import * as React from "react";
import {DispatchType, useAppSelector} from "../../redux/store";
import classes from "./Login.module.css"
import {useDispatch} from "react-redux";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import 'primeicons/primeicons.css';


const Login: React.FC = () => {
    const dispatch = useDispatch<DispatchType>()
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)

    const MyInput = ({...props}) => {
        if (props.type === "text") {
            return <InputText {...props} />
        } else if (props.type === "checkbox") {
            return <Checkbox {...props}/>
        } else if (props.type === "password") {
            return <Password feedback={false} toggleMask {...props}/>
        }
    }

    if (isAuth) {
        return <Navigate replace to="/profile"/>
    }
    return (
        <div className={classes.login}>
            <h1>Log in</h1>
            <h3>Данные тестового аккаунта: </h3>
            <h4>
                Email: free@samuraijs.com<br/>
                Password: free
            </h4>

            <Formik
                initialValues={{email: "", password: "", rememberMe: false, captcha: ""}}
                validate={values => {
                    const errors: Errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values: Values, {setStatus}) => {
                    dispatch(login({
                        email: values.email,
                        password: values.password,
                        rememberMe: values.rememberMe,
                        captcha: values.captcha,
                        setStatus
                    }))
                }}
                validationSchema={loginFormSchema}>
                {({status}) => (
                    <Form>
                        <div className={classes.input}>
                            <label htmlFor={'email'}>Email:</label>
                            <Field as={MyInput} type={"text"} name={'email'} placeholder={'e-mail'}/>
                        </div>
                        <div className={classes.error}>
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <div className={classes.input}>
                            <label htmlFor={'password'}>Password:</label>
                            <Field as={MyInput} type={"password"} name={'password'} placeholder={'password'}/>
                        </div>
                        <div className={classes.error}>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <div className={classes.checkbox}>
                            <Field as={MyInput} type={'checkbox'} name={'rememberMe'}/>
                            <label htmlFor={'rememberMe'}> Remember me </label>
                        </div>
                        <div className={classes.error}>{status ? <span>{status}</span> : null}</div>
                        <div>
                            {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
                            {captchaUrl &&
                                <Field as={MyInput} type={"text"} name={'captcha'} placeholder={'insert captcha'}/>}
                        </div>
                        <Button className={classes.button} label="Log in" type={'submit'}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default Login

interface Values {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

interface Errors {
    email?: string
}
