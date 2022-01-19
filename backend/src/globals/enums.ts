export interface SocketData {
    botId: number
    user: any
    room: string
    senderType: string
}
export enum SenderType {
    BOT = "bot",
    AGENT = "agent",
    USER = "user",
}
export interface ChatMessage {
    id: number;
    room: string;
    message: string;
    senderType: SenderType;
    senderId: number;
    botId: number;
    createdAt: Date;
}