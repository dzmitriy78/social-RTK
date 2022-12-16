import React, {useEffect, useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';

export const ChatForm: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [message, setMessage] = useState<string>("")
    const [statusChannel, setStatusChannel] = useState<"pending" | "open">("pending")

    useEffect(() => {
        let openHandler = () => {
            setStatusChannel("open")
        }
        ws?.addEventListener("open", openHandler)
        return () => {
            ws?.removeEventListener("open", openHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws?.send(message)
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
                <Button label={"Send"} icon="pi pi-check" onClick={sendMessage}
                        disabled={ws === null || statusChannel !== "open"}/>
            </div>
        </div>
    )
}