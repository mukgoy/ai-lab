import { BotEntity, FaqEntity, UploadEntity, UserEntity } from 'src/globals/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, TreeChildren, TreeParent, ManyToOne, RelationId } from 'typeorm';
import { ChatMessageEntity } from './chat-message.entity';
import { CommonProperty } from './common.property';

@Entity({ name: 'chat_users' })
export class ChatUserEntity extends CommonProperty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    primaryKey: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    name: string;

    @ManyToOne(() => BotEntity, bot => bot.chatUsers)
    bot: BotEntity;

    @ManyToOne(() => UserEntity, user => user.chatUsers)
    agent: UserEntity;

    @RelationId((chatUser: ChatUserEntity) => chatUser.agent) // you need to specify target relation
    agentUserId: number;

    constructor(user?: Partial<ChatMessageEntity>) {
        super()
        Object.assign(this, user);
    }
}
