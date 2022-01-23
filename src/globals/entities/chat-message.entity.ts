import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, RelationId, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';
import { SenderType } from '../enums';
import { BotEntity } from './bot.entity';
import { ChatUserEntity } from './chat-user.entity';

@Entity({name: 'chat_messages'})
export class ChatMessageEntity extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room: number;

  @Column()
  message: string;

  @Column({
    type: "enum",
    enum: SenderType,
    default: SenderType.BOT,
  })
  public senderType: SenderType;

  @Column()
  senderId: number;

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
