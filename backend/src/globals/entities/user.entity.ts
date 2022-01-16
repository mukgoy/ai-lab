import { BotEntity, FaqEntity, UploadEntity } from 'src/globals/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, TreeChildren, TreeParent} from 'typeorm';
import { CommonProperty } from './common.property';

@Entity({name: 'users'})
export class UserEntity extends CommonProperty{
    @PrimaryGeneratedColumn()
    userId: number;

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
}
