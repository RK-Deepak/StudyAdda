import React from 'react'

const Error = () => {
  return (
    <div class="flex items-center justify-center min-h-screen text-richblack-50">
        <div class="max-w-xl p-8 bg-richblack-800 rounded-lg shadow-lg flex flex-col gap-2">
            <h1 class="text-3xl text-red-600 font-bold mb-4">Oops!</h1>
            <p class="text-lg text-gray-700 mb-4">It seems there's a problem.</p>
            <ul className='flex flex-col gap-2 list-disc'>
                <li>Either you are not logged in</li>
                <li>Either you are not registered</li>
                <li>Either there is some server issue</li>
                <li>Kuch bhi ho sakta hai bhai...</li>
            </ul>
            <p class="text-sm text-center text-gray-700 mb-8 text-green-400 ">Please try again later.</p>

        </div>
    </div>
  )
}

export default Error