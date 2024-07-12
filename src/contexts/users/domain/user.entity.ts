import { randomUUID, UUID } from "crypto";

export interface PrimitiveUser {
    id: UUID;
    name: string;
    surname: string;
    birth: string;
    email: string;
    password: string;
    // postsIds: UUID;
}

export class User {
    constructor(private attributes: PrimitiveUser) { }

    static create(createUser: {
        name: string;
        surname: string;
        birth: string;
        email: string;
        password: string;
        // userId: UUID;
    }): User {
        return new User({
            id: randomUUID(),
            name: createUser.name,
            surname: createUser.surname,
            birth: createUser.birth,
            email: createUser.email,
            password: createUser.password,
        });
    }

    toValue(): PrimitiveUser {
        return{
            id: this.attributes.id,
            name: this.attributes.name,
            surname: this.attributes.surname,
            birth: this.attributes.birth,
            email: this.attributes.email,
            password: this.attributes.password
        }
    }
}
