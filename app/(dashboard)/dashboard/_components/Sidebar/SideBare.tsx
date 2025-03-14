import React from 'react'
import NewButtton from './NewButton'
import List from './List'

function Sidebar() {
  return (
    <aside className="fixed h-full w-[110px] text-borderColor-custom-blue bg-[#18009ecd]  flex flex-col gap-y-4 p-3 items-center">
      <List/> {/* display all organizations created */}
      <NewButtton/> {/*  the plus button to add a new organization */}
    </aside>
  )
}

export default Sidebar
