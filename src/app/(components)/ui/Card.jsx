import React from 'react'

function Card({children}) {
  return (
    <div className="bg-inherit shadow-lg">
        {children}
    </div>
  )
}

export default Card