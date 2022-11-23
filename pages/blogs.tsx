import { ThreeCircles } from 'react-loader-spinner'
import useAuth from '../hooks/AuthContext'
import { Product } from '@stripe/firestore-stripe-payments'
// components
import DefaultLayout from '../layouts/DefaultLayout'
import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react'
import BlogsBody from '../components/blogsBody'

interface Props {
  products: Product[]
}

const Blogs = ({
  products,
}: Props) => {
  const { loading, user } = useAuth()
  
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ThreeCircles color="red" height={110} width={110} />
      </div>
    )
  }
  return (
    <DefaultLayout>
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container w-96 sm:w-auto">
          <div role="main" className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold leading-9 text-center text-gray-800 dark:text-gray-50">Blogs</h1>
            <h1 className="text-base leading-normal text-center text-gray-600 dark:text-white mt-2 lg:w-1/2 md:w-10/12 w-11/12">Curated Blogs from India</h1>
          </div>
          <BlogsBody/>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Blogs
