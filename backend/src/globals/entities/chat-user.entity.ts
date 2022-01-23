import { BotEntity, FaqEntity, UploadEntity, UserEntity } from 'src/globals/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, TreeChildren, TreeParent, ManyToOne, RelationId, ObjectIdColumn, ObjectID } from 'typeorm';
import { ChatMessageEntity } from './chat-message.entity';
import { CommonProperty } from './common.property';

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
    bot: BotEntity;

    @Column({ nullable: true })
    agent: UserEntity;

    constructor(user?: Partial<ChatMessageEntity>) {
        super()
        Object.assign(this, user);
    }
}
