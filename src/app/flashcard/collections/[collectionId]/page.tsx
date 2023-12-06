import React from 'react'

const CollectionIdPage = ({params} : {params: { courseId : string}}) => {
  return (
    <div>
      Collection Id : {params.courseId}
    </div>
  )
}

export default CollectionIdPage