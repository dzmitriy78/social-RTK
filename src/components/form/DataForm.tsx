import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import classes from "./PostForm.module.css";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";

const DataForm: React.FC<PostFormProps> = ({callback, fieldType, placeholder, title, select}) => {

    const MyInput = ({...props}) => {
        if (fieldType === 'textarea') {
            return <InputTextarea rows={3} cols={30} autoResize {...props} />
        }
        return <InputText {...props}/>
    }

    return (
        <div>
            <Formik
                initialValues={{
                    text: "",
                    friend: null
                } as FormikValues}
                validate={values => {
                    const errors: Errors = {}
                    if (!values.text && !select) {
                        errors.text = 'The field must not be empty'
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    callback(values)
                    if (!select)
                        actions.resetForm({values: {text: "", friend: null}})
                }}
            >
                {() => (
                    <Form>
                        <div>
                            <Field as={MyInput}
                                   name={'text'}
                                   placeholder={placeholder}
                            />
                        </div>
                        <div className={classes.errorMessage}>
                            <ErrorMessage name="text" component="div"/>
                        </div>
                        <Button label={title} type={'submit'}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default DataForm;

export interface FormikValues {
    text: string
    friend: null | boolean
}

interface Errors {
    text?: string
}

interface PostFormProps {
    callback: (values: FormikValues) => void
    fieldType: string
    placeholder: string
    title: string
    select: boolean
}
