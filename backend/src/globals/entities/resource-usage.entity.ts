import { Entity, ObjectIdColumn, ObjectID, Column, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

export enum Resource {
	BOT = "bot",
	FAQ = "agent",
	LEAD = "lead",
}

@Entity({ name: 'resource_usage' })
export class ResourceUsageEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	owner: UserEntity;

	@Column({ type: "enum", enum: Resource, default: Resource.LEAD })
	resource: string;

	@Column({ default: 0 })
	usage: number;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date;

	constructor(data?: Partial<ResourceUsageEntity>) {
		Object.assign(this, data);
	}
}
