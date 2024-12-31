
export default function Toastmsg() {
    return (
        <div>
            <div
                id="toast"
                className="toast align-items-center text-bg-danger border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1050,
                }}
            >
                <div className="d-flex">
                    <div className="toast-body">
                        Please select dates within the current month only.
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
            <div
                id="toastOverTime"
                className="toast align-items-center text-bg-danger border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1050,
                }}
            >
                <div className="d-flex">
                    <div className="toast-body">
                        Your Selected Time Period for Current Project Exceeds 8hrs.Please Check your Time Entry or contact HR
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
            <div
                id="toastSucess"
                className="toast align-items-center text-bg-success border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1050,
                }}
            >
                <div className="d-flex">
                    <div className="toast-body">
                        TimeSheet Data Entered Successfully
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    )
}
