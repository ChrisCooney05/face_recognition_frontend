import React from 'react'
import './ImageLinkForm.css'

function ImageLinkForm() {
  return (
    <div>
      <p className='f3'>
        {'Hello human, give me an image and I shall find the faces for you'}
      </p>
      <div className='center'>
        <div className='pa4 br3 shadow-5 form center'>
          <input type='tex' className='f4 pa2 w-70 center' />
          <button className='w-30 grow link dib f4 ph3 pv2 white bg-light-purple'>Get Finding</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm