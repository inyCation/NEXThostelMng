import React from 'react'
import "./MainSearchBoxRadio.scss"

interface MainSearchBoxRadioProps {
    setFilter: (filter: string) => void;
}


const MainSearchBoxRadio : React.FC<MainSearchBoxRadioProps> = ({ setFilter }) => {

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilter(value);
    };


    return <span className="mydict">
        <div>
            <label>
                <input type="radio" name="radio" value="locality"  defaultChecked onChange={handleRadioChange} />
                <span>Locality</span>
            </label>
            <label>
                <input type="radio" name="radio" value="pincode" onChange={handleRadioChange} />
                <span>Pincode</span>
            </label>
            <label>
                <input type="radio" name="radio" value="title" onChange={handleRadioChange} />
                <span>Name</span>
            </label>

        </div>
    </span>
}

export default MainSearchBoxRadio