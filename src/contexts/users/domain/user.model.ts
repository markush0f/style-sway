import { randomUUID, UUID } from "crypto";

export interface PrimitiveUser {
  id: UUID;
  name: string;
  surname: string;
  birth: string;
  email: string;
  password: string;
}

export class User {
  constructor(private attributes: PrimitiveUser) { }

  static create(createUser: {
    name: string;
    surname: string;
    birth: string;
    email: string;
    password: string;
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
    return { ...this.attributes };
  }

  get id(): UUID {
    return this.attributes.id;
  }

  get name(): string {
    return this.attributes.name;
  }

  get surname(): string {
    return this.attributes.surname;
  }

  get birth(): string {
    return this.attributes.birth;
  }

  get email(): string {
    return this.attributes.email;
  }

  get password(): string {
    return this.attributes.password;
  }
}
