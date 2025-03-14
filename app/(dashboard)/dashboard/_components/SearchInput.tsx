"use client";
import qs from "query-string";
import {Search} from "lucide-react"
import { useDebounce } from "@uidotdev/usehooks";
import {useRouter } from "next/navigation"
import React from 'react'
import { Input } from "@/components/ui/input";
import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

function SearchInput() {
  const router=useRouter();
  const [search,setSearch]=useState("");
  const debouncedSearch=useDebounce(search,500);
  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)}
  useEffect(() => {
    const url=qs.stringifyUrl({
      url:"/dashboard",
      query:{
        search:debouncedSearch
      },
    },
  {skipEmptyString:true, skipNull:true})
  router.push(url);
  },[debouncedSearch,router])
  return (
    <div className="w-full relative bg-[#EEE0EB] ">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2  text-[#11009E] "/>
      <Input className=" w-[594px] pl-9 rounded-none  "
       placeholder="Search boards"
       onChange={handleChange}
       value={search}/>
      
    </div>
  )
}

export default SearchInput
