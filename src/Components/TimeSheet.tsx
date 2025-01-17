import Calander from './Calander'
import Form from './Form'
import { DateProvider } from "../Context/CalFormShareContext";
import { FunctionProvider } from '../Context/FunctionContxt';
import DayDetailMenu from './DayDetailMenu';
export default function TimeSheet() {
    return (
        <div>
            <DateProvider>
             <FunctionProvider>
                <h1>TimeSheet</h1>
                <div className='row'>
                    <div className='col-8'>
                        <Calander/>
                    </div>
                    <div className='col-4'>
                        <Form/>
                    </div>
                </div>
            </FunctionProvider>   
            
            </DateProvider>
            
        </div>
    )
}
