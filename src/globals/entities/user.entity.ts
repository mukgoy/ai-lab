import { BotEntity, ChatUserEntity, FaqEntity, UploadEntity } from 'src/globals/entities';
import { Entity, Column, OneToMany, TreeChildren, TreeParent, ObjectIdColumn, ObjectID} from 'typeorm';
import { CommonProperty } from './common.property';

@Entity({name: 'users'})
export class UserEntity extends CommonProperty{
    @ObjectIdColumn()
    userId: ObjectID;

    @TreeChildren()
    team: UserEntity[];

    @TreeParent()
    owner: UserEntity;

    @Column({unique: true})
    primaryKey : string;

    @Column()
    email : string;

    @Column()
    phone : string;

    @Column()
    name : string;

    @Column()
    password : string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => BotEntity, bot => bot.owner,{
        cascade: true,
    })
    bots: BotEntity[];

    @OneToMany(() => FaqEntity, faq => faq.owner,{
        cascade: true,
    })
    faqs: BotEntity[];

    @OneToMany(() => UploadEntity, upload => upload.owner,{
        cascade: true,
    })
    uploads: UploadEntity[];

    @OneToMany(() => ChatUserEntity, chatUser => chatUser.agent,{
        cascade: true,
    })
    chatUsers: ChatUserEntity[];
}
