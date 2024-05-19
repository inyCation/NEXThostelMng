import React from 'react'
import { FaSearch } from "react-icons/fa"
import "./Mainsearchbox.scss"

const MainSearchBox = () => {
    return (
        <div className='mainSearchBox'>
            <div className='mainSearchTitle'>Roam Around <div className='desc'>You can’t imagine, what is waiting for you around your city</div></div>

            <div className="input">
                <input type="text" placeholder='What are you looking for ?' />
                <div className="search">
                    <span>Search <FaSearch /></span>
                </div>
            </div>
        </div>
    )
}

export default MainSearchBox