import { useEffect, useState } from "react"
import axios from 'axios'
import Table from "./Table"

export default function Searchbar() {
    const [query, setQuery] = useState('')
    const [theData, setTheData] = useState([])
    const [lenghth, setLength] = useState(0)
    const [isSearcing , setIsSearching] = useState(false)
    console.log(query)
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`http://localhost:8000/users?username=${query}`)
            const data = res.data
            setTheData(data)
            console.log(data)
        }
        fetchUsers()
        if(query.length > 0) {
            setIsSearching(true)
        }else {
            setIsSearching(false)
        }
    },[query])
    return (
        <>
        <div className='relative'>
          <input
            type='search'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            placeholder='Search'
            id='searchbar'
            onChange={(e)=> setQuery(e.target.value)}
          />
          <label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>Search</label>
          
          {isSearcing && <Table users={theData}  />}
          
        </div>
        </>
    )
}