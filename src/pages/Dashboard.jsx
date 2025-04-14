import React from 'react'
import Login from './Login';

export default function Dashboard() {
  if(user){
    return(
        <p>"Dashbaord"</p>
    )
  }else{
    return(
        <Login />
    )
  }

}
