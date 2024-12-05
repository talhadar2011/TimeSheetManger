import Calander from './Calander'
import Form from './Form'
import { DateProvider } from "../Context/CalFormShareContext";

export default function TimeSheet() {
    return (
        <div>
            <DateProvider>
            <h1>TimeSheet</h1>
            <div className='row'>
                <div className='col-8'>
                    <Calander/>
                </div>
                <div className='col-4'>
                    <Form/>
                 </div>
            </div>
            </DateProvider>
            
        </div>
    )
}
