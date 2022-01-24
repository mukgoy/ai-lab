import { ObjectID } from "typeorm";

export enum SenderType {
    BOT = "bot",
    AGENT = "agent",
    USER = "user",
}

export interface SocketData {
    botId: ObjectID
    user: ChatUser
    room: string
    senderType: SenderType
}

export interface ChatMessage {
    id: ObjectID;
    room: string;
    message: string;
    senderType: SenderType;
    senderId: string;
    botId: string;
    createdAt: Date;
}
export interface ChatUser {
    id: ObjectID
    name: string
    email: string
    phone: string
    primaryKey: string
    agentUserId: string
    room: string,
    lastMessage: ChatMessage
}