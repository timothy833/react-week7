import { useDispatch, useSelector } from "react-redux"
import { useRef, useEffect } from "react";
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../redux/toastSlice";

const TOAST_DURATION = 2000;

export default function Toast() {
    const messages = useSelector((state)=> state.toast.messages);
    // console.log(messages);

    //綁定圖示
    const toastRefs = useRef({});
    const dispatch = useDispatch();
    useEffect(()=>{
        messages.forEach( message => {
            const messageElement = toastRefs.current[message.id]
        
            if(messageElement){
                const toastInstance = new BsToast(messageElement);
            
                toastInstance.show();

                setTimeout(()=>{
                    dispatch(removeMessage(message.id));
                },TOAST_DURATION);
            }
          
        });

    }, [messages])

    const handleDismiss = (message_id) => {
        dispatch(removeMessage(message_id));
    };

    return (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
          {messages.map((message)=>(
            <div key={message.id} ref={(el) =>toastRefs.current[message.id] = el} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header ${message.status=== "success" ? 'bg-success': 'bg-danger'} text-white`}>
                    <strong className="me-auto">{message.status=== "success" ? "成功" : "失敗"}</strong>
                    <button
                        onClick={()=> handleDismiss(message.id)}
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="toast-body">{message.text}</div>
            </div>
          ))}
        </div>

    )
}