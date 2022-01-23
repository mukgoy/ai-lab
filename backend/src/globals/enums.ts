import { ObjectID } from "typeorm";

export enum SenderType {
    BOT = "bot",
    AGENT = "agent",
    USER = "user",
}

export interface SocketData {
    botId: ObjectID
    user: ChatUser
    room: number
    senderType: SenderType
}

export interface ChatMessage {
    id: ObjectID;
    room: number;
    message: string;
    senderType: SenderType;
    senderId: number;
    botId: number;
    createdAt: Date;
}
export interface ChatUser {
    id: ObjectID
    name: string
    email: string
    phone: string
    primaryKey: string
    agentUserId: number
    room: number,
    lastMessage: ChatMessage
}