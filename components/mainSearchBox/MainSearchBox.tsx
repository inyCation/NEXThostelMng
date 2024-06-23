"use client"
import React, { useState, useContext, createContext, FormEvent } from 'react'
import { FaSearch } from "react-icons/fa"

import "./Mainsearchbox.scss"


import MainSearchBoxRadio from './MainSearchBoxRadio/MainSearchBoxRadio'
import axios from 'axios';
import { toast } from "react-hot-toast"
import { useAppDispatch } from '@/lib/hooks'
import { hostelRenderOnHome } from '@/lib/store/features/hostelRenderOnHome/hostelRenderOnHome'



import "@/styles/mediaQuery.scss"



const MainSearchBox: React.FC = () => {
    const [filter, setFilter] = useState("locality");
    const [query, setQuery] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    console.log(filter);
    const dispatch = useAppDispatch();

    const handleClick = () => {

        if(query===""){
            toast.error("Enter A Valid Search Value");
            return;
        }

        try {
            const getData = async () => {
                return await axios.post('/api/hostel/findbyfilter',
                    filter === "title" ? {"title":query} : filter === "pincode" ? {"pincode":query} : {"locality":query}
                )
            }

            toast.promise(
                getData().then((res) => {
                    return res
                }).catch((err) => {
                    return err
                }), {
                loading: "Searching Hostels....",
                success: (res) => {
                    dispatch(hostelRenderOnHome(res))
                    return <div>{"Success"}</div>
                },
                error: (err) => {
                    return <div>{"Error"}</div>
                }
            }
            )
        } catch (error: any) {
            console.log(error);

        }

        // Perform any other action related to search here
    };


    return (

        <div className='mainSearchBox'>
            <div className='mainSearchTitle'>Roam Around <div className='desc'>You can’t imagine, what is waiting for you around your city</div></div>

            <div className="input">
                <input type="text" placeholder='What are you looking for ?' value={query} onChange={handleChange} />
                <MainSearchBoxRadio setFilter={setFilter} />
                <div className="search" onClick={handleClick}>
                    <span >Search <FaSearch /></span>
                </div>
            </div>
        </div>

    )
}

export default MainSearchBox