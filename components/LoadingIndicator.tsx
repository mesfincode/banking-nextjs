import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingIndicator = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
     <Loader2 color='#0747b6' size={50} className="animate-spin" />
    </div>
  )
}

export default LoadingIndicator
