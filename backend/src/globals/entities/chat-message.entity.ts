import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, RelationId, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';
import { SenderType } from '../enums';
import { BotEntity } from './bot.entity';
import { ChatUserEntity } from './chat-user.entity';

@Entity({name: 'chat_messages'})
export class ChatMessageEntity extends BaseEntity{

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  room: string;

  @Column()
  message: string;

  @Column({
    type: "enum",
    enum: SenderType,
    default: SenderType.BOT,
  })
  public senderType: SenderType;

  @Column()
  senderId: string;

  @Column({ nullable: true })
  bot: BotEntity;

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
