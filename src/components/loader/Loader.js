import React from 'react'
import "./Loader.scss"
import loaderImg from "../../assets/loader.gif"
import  ReactDOM  from 'react-dom'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'>
            <img src={loaderImg} alt='loading'/>
        </div>
    </div>,
    document.getElementById("loader")
  )
}

export const SpinnerImg = () => {
    return (
        <div className='--center-all'>
            <img src={loaderImg} alt='loading'/>
        </div>
    )
}

export default Loader
