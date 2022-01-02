import { EntityRepository, Repository } from "typeorm";
import { FaqEntity } from "../entities/faq.entity";

@EntityRepository(FaqEntity)
export class FaqRepository extends Repository<FaqEntity> { 

    async createFaq(createFaqDto){
        let faq = new FaqEntity();
        faq.question = createFaqDto.question;
        faq.answer = createFaqDto.answer;
        return faq.save();
    }
}