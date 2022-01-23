import { environment } from "src/environments/environment"

export const userbotConfig = {
    uploads : environment.uploads,
    backend : environment.backend + "api/v1/userbot/",
    frontend : environment.frontend
}

export const userbotApi = {
    getFaqs: userbotConfig.backend + 'get-faqs/',
    getBotUi: userbotConfig.backend + 'get-botui/',
    createUser: userbotConfig.backend + 'create-user',
    updateUser: userbotConfig.backend + 'update-user/',
    getPreviousMessages: userbotConfig.backend + 'get-previous-messages',
}
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
    chatMessages: ChatMessage[]
}