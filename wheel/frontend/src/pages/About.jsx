import React, { useState,useMemo, useEffect } from 'react'
import PostService from '../API/PostService'
import jwt_decode from "jwt-decode";
import RowRandom from '../components/Lucky/RowLucky/rowrand1/RowRand';

import { useFetching } from '../hooks/useFetching';

const About = () => {
  const [countFreespin, setCountFreespin] = useState(0);

  const getItems = async () => {
    if(localStorage.getItem('authToken')){
        var token = localStorage.getItem('authToken');
        var decode = jwt_decode(token);
        const getCountItems = await PostService.getUsersItems(decode.id_user,JSON.parse(token));
        setCountFreespin(getCountItems.count_box);
    }
  }

  const takeFreespin = async () => {

    if(localStorage.getItem('authToken')){
      var token = localStorage.getItem('authToken');
      var decode = jwt_decode(token);
      const items = await PostService.takeFreeSpin(decode.username,JSON.parse(token));
      console.log(items.data.data);
      setCountFreespin((c) => c + 10);
    }
  }

  const addMyCountItem = () =>{
    setCountFreespin((c) => c - 1);
  }


  useMemo(() => getItems(), [countFreespin]);

  return (
    <div >
      <div className='pl-10'>
      <h1 className='mb-4 px-3 uppercase font-bold text-xl'>
       you have: <span className='text-2xl text-green-700'>{countFreespin}</span> spin
      </h1>

        <button className=' ease-in duration-300 mb-3 shadow-xl shadow-black hover:shadow-none hover:text-white hover:bg-slate-800 hover:border-slate-900 transition-all py-8 px-4 border-2 rounded-full border-slate-300 text-black bg-slate-200' onClick={takeFreespin}>
            Freespin
        </button>

      </div>
    
      <RowRandom create={addMyCountItem}/>
      
    </div>
    
  )
}

export default About