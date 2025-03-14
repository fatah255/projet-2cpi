import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/Button';
//if there's no boards created in the organization this root page will be displayed
function EmptySearch() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Image
      src="/EmptyBoards.svg"
      alt="Empty Favorites"
      width={110}
      height={110}
      />
      <h2 className='text-2xl font-semibold mt-6'>Create your first board !</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>
      <div>
        <Button size="lg">
            Create board
        </Button>
      </div>
    </div>
  )
}

export default EmptySearch



