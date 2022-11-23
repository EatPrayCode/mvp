import React from 'react'
import { ThreeCircles, ThreeDots } from 'react-loader-spinner'

const Loader = ({ color = 'red' }: { color: string }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ThreeCircles color={color} height={110} width={110} />
    </div>
  )
}

export default Loader
