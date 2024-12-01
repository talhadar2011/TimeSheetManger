import { useContext } from "react";
import"../CSS/Form.css"
import { useDateContext } from "./CalFormShareContext";
export default function Form() {
    const { dates } = useDateContext();

    return (
        <div >
            <h3 className='TimeSheetFormh1'>TimeSheet Form</h3>
            <div className='TimeSheetForm'>
                <div className='Form'>
                    <div className="mb-3">
                        <label  className="form-label"> Project</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Open this select </option>
                            <option value="1">FrontEnd</option>
                            <option value="2">BackEnd</option>
                            <option value="3">AWS</option>
                        </select> 
                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> StartDate</label>
                        <input type='text' className='form-control' value={dates.startDate}  placeholder='Select StartDate from Calander' disabled/>

                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> EndDate</label>
                        <input type='text' className='form-control'value={dates.endDate}  placeholder='Select EndDate from Calander' disabled />

                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> StartTime</label>
                        <input type='time' className='form-control'></input>

                    </div>
                    <div className="mb-3">
                        <label  className="form-label"> EndTime</label>
                       <input type='time' className='form-control'></input>
                    </div>
                    <button className='TimeSheetButton'> Submit TimeSheet</button>
                </div>
                {/* <button className='Collapsing'>x</button> */}

            </div>
        </div>
    )
}
