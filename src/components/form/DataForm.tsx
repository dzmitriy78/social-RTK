import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import classes from "./PostForm.module.css"
import {postFormSchema} from "./formValidation/loginFormSchema";

const DataForm: React.FC<PostFormProps> = ({callback, fieldType, placeholder, title}) => {
    return (
        <div>
            <Formik
                initialValues={{text: ""}}
                validate={values => {
                    const errors: Errors = {};
                    if (!values.text) {
                        errors.text = 'The field must not be empty'
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    callback(values)
                    actions.resetForm({values: {text: ""}})
                }}
                validationSchema={postFormSchema}
            >
                {() => (
                    <Form>
                        <div>`
                            <Field component={fieldType}
                                   name={'text'}
                                   placeholder={placeholder}/>
                        </div>
                        <div className={classes.errorMessage}>
                            <ErrorMessage name="text" component="div"/>
                        </div>
                        <button className={classes.btn}
                                type={'submit'}
                        >{title}</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DataForm;

export interface FormikValues {
    text: string
}

interface Errors {
    text?: string
}

interface PostFormProps {
    callback: (values: FormikValues) => void
    fieldType: string
    placeholder: string
    title: string
}
