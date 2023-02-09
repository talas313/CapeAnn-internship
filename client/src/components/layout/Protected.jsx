import React ,{useContext}from 'react';
import {Navigate} from 'react-router-dom'
import { RoleContext } from './LogPages';
const Protected=({children})=>{
    
    const token=localStorage.getItem('token')
    if(!token){
    return <Navigate to ="/" replace />;
    }
   
    return (children)
}
export default Protected;