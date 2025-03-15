import React from 'react'
import{
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export interface HintProps {
    label:string;
    children:React.ReactNode;
    side? : "top" | "bottom" | "left" | "right";
    align? : "start" | "center" | "end";
    sideOffset?:number;
    alignOffset?:number;
}

function Hint({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
}:HintProps) {
  return (
    //This is a shadcn component to display a hint when hovering over the plus in the sidebar
    <TooltipProvider>
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent 
            className='text-[ #11009E] bg-[#EEE0EB]' 
            side={side} 
            align={align} 
            sideOffset={sideOffset} 
            alignOffset={alignOffset}>
                <p className='font-semibold capitalize'>
                    {label} 

                </p>
            </TooltipContent>

        </Tooltip>
    </TooltipProvider>  )
}

export default Hint
