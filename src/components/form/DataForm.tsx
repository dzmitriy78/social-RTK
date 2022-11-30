import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import classes from "./PostForm.module.css";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import {Button} from "primereact/button";

const DataForm: React.FC<PostFormProps> = ({callback, fieldType, placeholder, title, select}) => {
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
                            <Field component={fieldType}
                                   name={'text'}
                                   placeholder={placeholder}/>
                        </div>
                        <div className={classes.errorMessage}>
                            <ErrorMessage name="text" component="div"/>
                        </div>
                        <Button type={'submit'}
                        >{title}
                        </Button>
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
