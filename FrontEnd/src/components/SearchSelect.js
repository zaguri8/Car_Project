import { Children, useState } from "react"
import { translate } from "./Form"



const SearchSelect = ({ name, options, filterBy, onSelect }) => {

    const [filteredOptions, setFilteredOptions] = useState(options)
    return <>
        <select name={name} onInput={(e) => {
            const selected = options.find(option => option.value == e.target.value)
            onSelect(selected)
        }} defaultValue={options[0]?.value} className="search-select">
            {Children.toArray(filteredOptions.map(option => (
                <option value={option.value}>{option.name}</option>
            )))}
        </select>
        <input className="form_search" type="text" placeholder={'חפש ' + translate(name)} onChange={e => {
            const filter = e.target.value
            const filtered = filteredOptions.filter(option => filterBy(option.object, filter))
            setFilteredOptions((filtered == [] || !filter) ? options : filtered)
        }} />
    </>
}

export default SearchSelect