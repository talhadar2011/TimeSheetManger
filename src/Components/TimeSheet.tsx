import React from 'react'
import Calander from './Calander'
import Form from './Form'
import { StatusProvider } from "./CalFormShareContext";

export default function TimeSheet() {
    return (
        <div>
            <StatusProvider>
            <h1>TimeSheet</h1>
            <div className='row'>
                <div className='col-8'>
                    <Calander/>
                </div>
                <div className='col-4'>
                    <Form/>
                 </div>
            </div>
            </StatusProvider>
            
        </div>
    )
}
