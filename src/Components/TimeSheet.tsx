import React from 'react'
import Calander from './Calander'
import Form from './Form'
export default function TimeSheet() {
    return (
        <div>
            <h1>TimeSheet</h1>
            <div className='row'>
                <div className='col-8'>
                    <Calander/>
                </div>
                <div className='col-4'>
                    <Form/>
                 </div>
            </div>
        </div>
    )
}
