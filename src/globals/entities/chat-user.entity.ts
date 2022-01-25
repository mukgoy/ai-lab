import { BotEntity, ChatMessageEntity, UserEntity } from 'src/globals/entities';
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { CommonProperty } from './common.property';

export enum ChatUserType {
    BOT = "bot",
    AGENT = "agent",
    USER = "user",
}

@Entity({ name: 'chat_users' })
export class ChatUserEntity extends CommonProperty {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ unique: true })
    primaryKey: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    @Column({ type: "enum", enum: ChatUserType, default: ChatUserType.USER })
    type: ChatUserType;

    @Column({ nullable: true })
    bot: BotEntity;

    @Column({ nullable: true })
    agent: UserEntity;

    @Column({ nullable: true })
    lastMessage: any

    constructor(user?: Partial<ChatUserEntity>) {
        super()
        Object.assign(this, user);
    }
}
