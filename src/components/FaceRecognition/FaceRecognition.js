import React from 'react'

function FaceRecognition({ imageUrl }) {
  return (
    <div className='center' alt='img'>
      <img src={imageUrl} alt='img' />
    </div>
  );
}

export default FaceRecognition