import { ChangeEvent, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Input from "../../ui/Input"
import SearchList from "../SearchList"

const SearchField = () => {
  const [value, setValue] = useState<string>()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setValue(event.target.value)
    }, 1000);
  }
  
  return (
    <div>
      <form className="relative w-[600px] mb-6">
        <Input
          type="text"
          name="search"
          placeholder="Find some friends..."
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute right-4 top-4"
        />
      </form>
      {value && <SearchList value={value}/>}
    </div>
  )
}

export default SearchField
