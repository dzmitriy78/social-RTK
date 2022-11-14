import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import useDebounce from "../hooks/useDebounce";
import {Dropdown} from "primereact/dropdown";


const SearchUsers: React.FC<PropsType> = ({callback}) => {

    const [searchValue, setSearchValue] = useState('')
    const [selectedValue, setSelectedValue] = useState<null | boolean>("null" as unknown as null);

    const debouncedValue = useDebounce<string>(searchValue, 600)

    const friends = [
        {name: 'all', value: "null" as unknown as null},
        {name: "friends", value: true},
        {name: "not friends", value: false},
    ]

    useEffect(() => {
        callback(searchValue, selectedValue)
    }, [debouncedValue, selectedValue])

    const onSelectChange = (e: { value: React.SetStateAction<null | boolean> }) => {
        setSelectedValue(e.value)
    }

    return (
        <div>
            <div className="card">
              <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <Dropdown style={{marginLeft:10}} value={selectedValue} optionValue={"value"} options={friends} onChange={onSelectChange}
                              optionLabel="name"/>
                </span>
            </div>
        </div>
    )
}

export default SearchUsers;

type PropsType = {
    callback(value: string, selectedValue: null | boolean): void
}