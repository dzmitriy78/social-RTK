import React, {useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import {useDispatch} from "react-redux";
import {sendMessage} from "../../redux/chat-reducer";
import {useAppSelector} from "../../redux/store";

export const ChatForm: React.FC = () => {

    const status = useAppSelector(state => state.chat.status)
    const [message, setMessage] = useState<string>("")

    const dispatch = useDispatch<any>()
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage({message}))
        setMessage("")
    }

    /*  const sendMessage = () => {
          if (message) {
              waitForSocketConnection(ws, function () {
                  console.log("message sent!!!");
                  ws.send(message)
                  setMessage("")
              })
          }
      }

    // Make the function wait until the connection is made...
      function waitForSocketConnection(socket: WebSocket, callback: (() => void) | null) {
          setTimeout(
              function () {
                  if (socket.readyState === 1) {
                      console.log("Connection is made")
                      if (callback != null) {
                          callback();
                      }
                  } else {
                      console.log("wait for connection...")
                      waitForSocketConnection(socket, callback);
                  }

              }, 5); // wait 5 millisecond for the connection...
      }
    */

    return (
        <div>
            <div className="card">
                <InputTextarea rows={3} cols={30} autoResize
                               value={message}
                               onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <Button label={"Send"} icon="pi pi-check" onClick={sendMessageHandler}
                        disabled={status !== "ready"}/>
            </div>
        </div>
    )
}