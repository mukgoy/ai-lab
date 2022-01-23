import { Entity, Column, OneToMany, ManyToOne, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';
import { ChatMessageEntity } from './chat-message.entity';
import { ChatUserEntity } from './chat-user.entity';
import { CommonProperty } from './common.property';
import { FaqEntity } from './faq.entity';
import { UserEntity } from './user.entity';

export class BotDefaultJsondata {
    isGradient = true;
    bgColor1 = "#50cccc";
    bgColor2 = "#45aeca";
    textColor = "#FFFFFF";
    header = {
        text : "I am a Robot",
        logo : "http://localhost:4200/assets/mybot/images/bot-header-1.svg"
    };
    launcher = {
        logo : "http://localhost:4200/assets/mybot/images/launcher-3.svg",
        text : "Help"
    }
}

export class BotDefaultOnboardjson {
    welcomeMsg = "<p>Hey there, I am LALA!. Hope you are doing good.</p><p>Thanks for reaching out to our support</p>";
    askEmailMsg = "Please provide your email to connect.";
    askPhoneMsg = "Please provide your phone number to connect.";
    askNameMsg = "Please provide your name.";
}

@Entity({name: 'bots'})
export class BotEntity extends CommonProperty{
    @PrimaryGeneratedColumn()
    botId: number;

    @Column()
    name: string;

    // @Column({ nullable: true, type: "text", default: JSON.stringify(new BotDefaultJsondata()) })
    @Column({ nullable: true })
    jsondata: string;

    // @Column({ nullable: true, type: "text", default: JSON.stringify(new BotDefaultOnboardjson()) })
    @Column({ nullable: true })
    onboardjson: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => FaqEntity, faq => faq.bot,{
        cascade: true,
    })
    faqs: FaqEntity[];

    @ManyToOne(() => UserEntity, owner => owner.bots)
    owner: UserEntity;

    @OneToMany(() => ChatMessageEntity, chat => chat.bot,{
        cascade: true,
    })
    chats: ChatMessageEntity[];

    @OneToMany(() => ChatUserEntity, chatUser => chatUser.bot,{
        cascade: true,
    })
    chatUsers: ChatUserEntity[];
}
