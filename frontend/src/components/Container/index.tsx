import React from 'react'

type Props = {
    children: React.ReactElement[] | React.ReactElement
}

const Container = ({children}:Props) => {
  return (
    <div className='flex w-[600px] mx-auto items-center justify-center flex-col h-screen'>
      {children}
    </div>
  )
}

export default Container
