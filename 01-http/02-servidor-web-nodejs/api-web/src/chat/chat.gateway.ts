import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";
// ws://localhost:3001/websockets

@WebSocketGateway(3001,{ namespace:'/websockets'}) //es por donde se va a realizar la peticion
export class ChatGateway{
    @WebSocketServer() server;
    constructor(){
        console.log(this.server);

    }
    @SubscribeMessage('holaMundo')
    holaMundo(client: Client | any, data: any){
        console.log(data);
        console.log('Nos hacen la peticion');
        console.log(this.server);
        client.broadcast.emit('saludaron', data);
        return 'Hola '+ data.nombre;
    }

}