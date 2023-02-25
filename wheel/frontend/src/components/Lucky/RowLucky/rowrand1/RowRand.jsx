import React, { useEffect, useState } from 'react'
import './CSS/style.css'
import jwt_decode from "jwt-decode";
import PostService from '../../../../API/PostService';

import { useFetching } from '../../../../hooks/useFetching';

const RowRandom = ({create}) =>{
    const cells = 111
    const [allItems,setAllItems] = useState()
    const [spinResult, setSpinResult] = useState([]);

    const [fetchPost1,isPostsLoading1] = useFetching(async() => {
        const items = await PostService.getCombackBox()
        setAllItems(items)
    
      })
   
    const [fetchPost,isPostsLoading] = useFetching(async() => {

        if(localStorage.getItem('authToken')){
            var token = localStorage.getItem('authToken');
            var decode = jwt_decode(token);
    
            const items = await PostService.postSpin(decode.username,JSON.parse(token));
            console.log(items.data.data)

            if(items.data.status === 200){
            
                const found = allItems.find(a => a.cases = items.data.data.name);
                setSpinResult(found);
                
                start()
                create()
            }
        }
      })
        
    function generateItems() {
        document.querySelector('.list').remove()
        document.querySelector('.scope').innerHTML = `
            <ul class="list"></ul>
        `
        const list = document.querySelector('.list')
        for (let i = 0; i < cells; i++) {
            let item = allItems[Math.floor(Math.random()*allItems.length)]
            
            if (i===55) item = spinResult
            if (spinResult.length === 0 && i === 55) item = allItems[0]
            const li = document.createElement('li')
            li.setAttribute('data-item', JSON.stringify(item))
            li.classList.add('list__item')
            li.innerHTML = `
            <span><h5>'${item.cases}'</h5></span>
            `
            list.append(li)
        }
    }

    useEffect(() => {
        fetchPost1()
    }, [])
    useEffect(() => {
        if(allItems?.length > 0) {
            generateItems();
        }
    }, [allItems])


    function start() {
        generateItems();

        const list = document.querySelector('.list')
        // list.setAttribute('data-item', JSON.stringify(spinResult))
        setTimeout(() => {
            list.style.left = '50%'
            list.style.transform = 'translate3d(-50%, 0, 0)'
        }, 0)
        
        // console.log(list.querySelectorAll('li')[45].setAttribute('data-item', JSON.stringify(spinResult)))
        const item = list.querySelectorAll('li')[55]
        list.addEventListener('transitionend', () => {
            // isStarted = false
            item.classList.add('active')
            const data = JSON.parse(item.getAttribute('data-item'))

            console.log(data);
        }, {once: true})
    }


    return (
            <div className="myBody">
                <div className="apple">
                    <ul className="pointer" alt="" />
                    <div className="scope">
                        <ul className="list" />
                    </div>
                    {/* {buttonIs
                        ?<button type="button" className="bg-indigo-500 ..." disabled>
                            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            </svg>
                            Processing...
                        </button>
                        :<button onClick={fetchPost} className="start">SPIN</button>
                    } */}
                    {isPostsLoading
                        ?<button onClick={fetchPost} className="start" disabled>SPIN</button>
                        :<button onClick={fetchPost} className="start">SPIN</button>
                    }
                    
                </div>

            </div>
            
      );
  };

  export default RowRandom;