export enum SenderType {
    BOT = "bot",
    AGENT = "agent",
    USER = "user",
}

export interface SocketData {
    botId: number
    user: ChatUser
    room: number
    senderType: SenderType
}

export interface ChatMessage {
    id: number;
    room: number;
    message: string;
    senderType: SenderType;
    senderId: number;
    botId: number;
    createdAt: Date;
}
export interface ChatUser {
    id: number
    name: string
    email: string
    phone: string
    primaryKey: string
    agentUserId: number
    room: number,
    lastMessage: ChatMessage
}