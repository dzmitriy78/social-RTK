import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import useDebounce from "../hooks/useDebounce";
import {Dropdown} from "primereact/dropdown";


const SearchUsers: React.FC<PropsType> = ({callback}) => {

    const [value, setValue] = useState('')
    const [selectedValue, setSelectedValue] = useState("null");

    const debouncedValue = useDebounce<string>(value, 600)

    const friends = [
        {name: 'all', value: "null"},
        {name: "friends", value: 'true'},
        {name: "not friends", value: 'false'},
    ]

    useEffect(() => {
        callback(value, selectedValue)
        console.log(value)
        console.log(selectedValue)
    }, [debouncedValue, selectedValue])

    const onSelectChange = (e: { value: React.SetStateAction<string> }) => {
        setSelectedValue(e.value)
    }

    return (
        <div>
            <div className="card">
              <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText type="search" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <Dropdown value={selectedValue} options={friends} onChange={onSelectChange} optionLabel="name"/>
                </span>
            </div>
        </div>
    )
}

export default SearchUsers;

type PropsType = {
    callback(value:string, selectedValue:string): void
}