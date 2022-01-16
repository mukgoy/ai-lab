import { BotEntity, FaqEntity, UploadEntity } from 'src/globals/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, TreeChildren, TreeParent, ManyToOne} from 'typeorm';
import { ChatMessageEntity } from './chat-message.entity';
import { CommonProperty } from './common.property';

@Entity({name: 'chat_users'})
export class ChatUserEntity extends CommonProperty{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    primaryKey : string;

    @Column()
    email : string;

    @Column()
    phone : string;

    @Column()
    name : string;

    @ManyToOne(() => BotEntity, bot => bot.chatUsers)
    bot: BotEntity;
    
    @OneToMany(() => ChatMessageEntity, chat => chat.recipient,{
        cascade: true,
    })
    chats: ChatMessageEntity[];
}
