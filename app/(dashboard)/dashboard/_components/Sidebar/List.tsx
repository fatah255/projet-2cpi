"use client";
import { useOrganizationList } from "@clerk/nextjs"

import React from 'react'
import { Item } from './item'
//this is used to display organizations created in the sidebar 
function List() {
  /*You can modify it to only appear the innitials of the organizations' names from the clerck acount */
    const {userMemberships}=useOrganizationList({
        userMemberships:{
            infinite:true
        }
    })
    if (!userMemberships) return null;
  return (
    <ul className="space-y-4">
        {userMemberships.data?.map((mem) => (
            <Item 
              key={mem.organization.id}
              id={mem.organization.id}
              name={mem.organization.name}
              imageUrl={mem.organization.imageUrl}
            />

        ))}
      
    </ul>
  )
}

export default List
