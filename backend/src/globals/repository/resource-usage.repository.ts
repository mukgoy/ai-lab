import { EntityRepository, Repository } from "typeorm";
import { ResourceUsageEntity } from "../entities";

@EntityRepository(ResourceUsageEntity)
export class ResourceUsageRepository extends Repository<ResourceUsageEntity> { 

}