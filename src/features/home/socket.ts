// socket.ts
import { BACKEND_SERVER, SOCKETIO_ENDPOINT } from "@/config";
import { io, Socket } from "socket.io-client";


class SocketConnection {
    private socket: Socket | null = null;
    constructor() {

    }

    public connect(token: string) {
        this.socket = io(`${BACKEND_SERVER}`, {
            path: SOCKETIO_ENDPOINT,
            autoConnect: false, // important for control
            transports: ["websocket"], // optional optimization
            auth: {
                token,
            },
        });
        this.socket.connect();
    }

    public disconnect(){
        if(this.socket){
            this.socket.disconnect();
        }
    }

    public test(){
        const {socket} = this;
        if(socket){
            socket.emit("hello",{}, (ack: any) => {
                console.log({ack});
            });
        }
    }
}

let conn: SocketConnection | null = null;

export const getSocket = (): SocketConnection => {
    if (!conn) {
        conn = new SocketConnection();
    }
    return conn;
};

