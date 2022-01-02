import { UserEntity } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { CommonProperty } from './common.property';
import { FaqEntity } from './faq.entity';

export interface BotDefaultJsondata {
    isGradient : true,
    bgColor1 : "#50cccc",
    bgColor2 : "#45aeca",
    textColor : "#FFFFFF",
    header : {
        title : "I am a Robot",
        logo : "http://localhost:4200/assets/mybot/images/bot-icon.png"
    },
    launcher : {
        icon : "http://blog.chatboot.com/images/logo.svg",
        text : "Ask us"
    }
}

@Entity({name: 'bots'})
export class BotEntity extends CommonProperty{
    @PrimaryGeneratedColumn()
    botId: number;

    @Column()
    name: string;

    @Column({ nullable: true, type: "text" })
    jsondata: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => FaqEntity, faq => faq.bot,{
        cascade: true,
    })
    faqs: FaqEntity[];

    @ManyToOne(() => UserEntity, owner => owner.bots)
    owner: UserEntity;

}
