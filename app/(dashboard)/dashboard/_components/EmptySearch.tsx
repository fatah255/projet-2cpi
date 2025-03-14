import React from 'react'
import Image from "next/image";
//if there's no search result this root page will be displayed
function EmptySearch() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Image
      src="/emptySearch.svg"
      alt="Empty Search"
      width={140}
      height={140}
      />
      <h2 className='text-2xl font-semibold mt-6'>No results found!</h2>
      <p className='text-muted-foreground text-sm mt-2'>Try searching for something else</p>
    </div>
  )
}

export default EmptySearch



