export let subscribers = {
    "message-received": [] as MessageReceivedSubscribersType[],
    "status-changed": [] as StatusChangedSubscribersType[]
}
let wsChannel: WebSocket
const closeHandler = () => {
    notifySubscribersAboutStatus("pending")
    setTimeout(createChannel, 1000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers["message-received"].forEach(s => s(newMessage))
}
const openHandler = () => {
    notifySubscribersAboutStatus("ready")
}
const errorHandler = () => {
    notifySubscribersAboutStatus("error")
    console.error("Refresh page")
}

const cleanUp = () => {
    wsChannel?.removeEventListener("close", closeHandler)
    wsChannel?.removeEventListener("message", messageHandler)
    wsChannel?.removeEventListener("open", openHandler)
    wsChannel?.removeEventListener("error", errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    wsChannel?.close()

    wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscribersAboutStatus("pending")
    wsChannel.addEventListener("close", closeHandler)
    wsChannel.addEventListener("message", messageHandler)
    wsChannel.addEventListener("open", openHandler)
    wsChannel.addEventListener("error", errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["message-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        wsChannel?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessageReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMess(message: string) {
        wsChannel?.send(message)
    }
}
type MessageReceivedSubscribersType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscribersType = (status: StatusType) => void
type EventsNamesType = "message-received" | "status-changed"
export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string

}

export type StatusType = "pending" | "ready" | "error"