import React from 'react'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='tc f3'>{'This Magic Brain will detect faces in your pictures. Give it a try.'}</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input
                        className='bn f4 pa2 w-70 center'
                        type='tex'
                        onChange={onInputChange}/>
                    <button
                        className='bn br2 w-30 grow f4 link ph3 pv2 dib white bg-light-blue'
                        onClick={onButtonSubmit}>
                    Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm