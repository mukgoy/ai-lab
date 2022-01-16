import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, RelationId, BaseEntity } from 'typeorm';
import { BotEntity } from './bot.entity';
import { ChatUserEntity } from './chat-user.entity';

@Entity({name: 'chat_messages'})
export class ChatMessageEntity extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => ChatUserEntity, user => user.chats)
  sender: ChatUserEntity;

  @ManyToOne(() => ChatUserEntity, user => user.chats)
  recipient: ChatUserEntity;

  @ManyToOne(() => BotEntity, bot => bot.chats)
  bot: BotEntity;

  @RelationId((faq: ChatMessageEntity) => faq.bot) // you need to specify target relation
  botId: number;

  @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  constructor(chat?: Partial<ChatMessageEntity>) {
    super()
    Object.assign(this, chat);
  }
}
