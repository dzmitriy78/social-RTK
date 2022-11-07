import React from "react";

const Contacts: React.FC<ContactPropsType> = ({title, value}) => {
    return <div>
        <b>{title}</b>: {value}
    </div>
}
export default Contacts

type ContactPropsType = {
    title: string
    value: string
}