import React from "react";
import classes from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {useFormik} from "formik";
import {saveProfile} from "../../redux/profileSlice";
import {ProfileType} from "../Profile/Profile";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {InputTextarea} from "primereact/inputtextarea";
import 'primeicons/primeicons.css';
import {useAppDispatch} from "../hooks/hooks";

const ProfileDataEditingForm: React.FC<ProfileDataEditingForm> = ({profile, error}) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            contacts: profile.contacts || "",
            photos: {small: "", large: ""},
            userId: 0
        },
        onSubmit: (values) => {
            dispatch(saveProfile({profile: values}))
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={classes.error}>{error}</div>
            <div className={classes.description}>
                <label htmlFor={'fullName'}><b>fullName: </b></label>
                <InputText className={classes.contactsEdit} type='text'
                           {...formik.getFieldProps("fullName")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'lookingForAJob'}> <b>Looking for a job: </b></label>
                <Checkbox className={classes.contactsEdit} type={"checkbox"} checked={formik.values.lookingForAJob}
                          {...formik.getFieldProps("lookingForAJob")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'lookingForAJobDescription'}> <b>My professional skills: </b></label>
                <InputText className={classes.contactsEdit} type='text'
                           {...formik.getFieldProps("lookingForAJobDescription")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'aboutMe'}><b>AboutMe: </b></label>
                <InputTextarea className={classes.contactsEdit} {...formik.getFieldProps("aboutMe")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'contacts'}><b>Contacts</b></label>: {Object.keys(profile.contacts)
                .map((key, i) => {
                    return <div key={i}>
                        <b>{key}: <InputText className={classes.contactsEdit} type='text'
                                             {...formik.getFieldProps("contacts." + key)}/>
                        </b>
                    </div>

                })}
            </div>

            <Button label="Send" icon="pi pi-check" type={'submit'}/>
        </form>
    )
}
export default ProfileDataEditingForm

type ProfileDataEditingForm = {
    error: string
    profile: ProfileType
}