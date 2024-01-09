import React, { useState } from "react"
import axios from 'axios';

const Home = (props) => {
    const { userName , login } = props
   

    return <div className="mainContainer"> {
         !login? <div>User is not authorized</div> :  
            <div>
                <div className={"titleContainer"}>
                    <div>Welcome!</div>
                </div>
                <div className={"buttonContainer"}>
                    <div>
                    {userName} You have successfully logged in 
                    </div> 
                </div>
            </div>  } 
    </div>
}

export default Home