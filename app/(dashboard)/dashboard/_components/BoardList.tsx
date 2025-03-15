'use clent'
import React from 'react'
import EmptySearch from './EmptySearch';
import EmptyFavorites from "./EmptyFavorites";
import EmptyBoards from './EmptyBoards';
interface BoardListProps{
    orgId:string;
    query:{
        search?: string;
        favorites?:string;

    }
}
//First an organzation must be created 
function BoardList({
    orgId,
    query,
}:BoardListProps) {
    const data =[]; //Change to API call
    //Order of if statements is important
    if(!data?.length && query.search){
        return (
            <EmptySearch/> 
        )
    }
    if(!data?.length && query.favorites){
        return (
            <EmptyFavorites />
        )
    }
    if(!data?.length){
        return (
            <EmptyBoards/>
        )
    }
  return (
    <div>
      {JSON.stringify(query)} 
    </div>
  )
}

export default BoardList
