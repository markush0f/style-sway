import { randomUUID, UUID } from "crypto";

export interface PrimitivePost {
    id: UUID;
    title: string;
    content: string;
    userId: UUID;
    date: string;
}

export class Post {
    constructor(private attributes: PrimitivePost) { }

    static create(createPost: {
        title: string;
        content: string;
        userId: UUID;
    }): Post {
        return new Post({
            id: randomUUID(),
            title: createPost.title,
            content: createPost.content,
            userId: createPost.userId,
            date: new Date().toISOString()
        });
    }

    toValue(): PrimitivePost {
        return{
            id: this.attributes.id,
            title: this.attributes.title,
            content: this.attributes.content,
            userId: this.attributes.userId,
            date: this.attributes.date
        }
    }
}
