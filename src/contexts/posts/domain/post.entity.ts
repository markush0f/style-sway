import { randomUUID, UUID } from "crypto";

export interface PrimitivePost {
    id: UUID;
    title: string;
    content: string;
    likes: number;
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
            likes: 0,
            userId: createPost.userId,
            date: new Date().toISOString()
        });
    }

    toValue(): PrimitivePost {
        return{
            id: this.attributes.id,
            title: this.attributes.title,
            content: this.attributes.content,
            likes: this.attributes.likes,
            userId: this.attributes.userId,
            date: this.attributes.date
        }
    }
}
