import React from 'react'

function Card({children}) {
  return (
    <div className="bg-inherit shadow-lg hover:bg-gray-500">
        {children}
    </div>
  )
}

export default Card