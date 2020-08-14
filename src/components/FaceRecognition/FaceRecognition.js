import React from 'react'

function FaceRecognition({ imageUrl }) {
  if (imageUrl !== '') {
    return (
      <div className='center ma' alt='img'>
        <div className='absolute mt2'>
          <img src={imageUrl} alt='img' width='500px' height='auto' />
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default FaceRecognition