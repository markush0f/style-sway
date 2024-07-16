import { randomUUID, UUID } from "crypto";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { PostRepository } from "../../domain/post.repository";
import { Mutex } from "async-mutex";
import { PostNotFoundException } from "../../domain/exceptions/post-not-found.exception";

export class InMemoryPostRepository extends PostRepository {
  // Entendiendo el mutex:
  // Por ejemplo tenemos dos personas que dan like al mismo tiempo, eso podria producir un error
  // de condicion de carrera (ocurre cuando dos o mas hilos de ejecucion intentan realizar)
  // operaciones simultaneas sobre el mismo recurso compartido. Entonces, con mutex nos
  // aseguramos que las operaciones se realicen de manera ordenada, por lo que cuando la
  // segunda persona intenta adquirir el mutex mientras esta siendo utilizado por la primera persona
  // la segunda persona entra en un estado de espera hasta que el mutex se libere.

  private posts: PrimitivePost[] = [
    {
      id: "243d55c1-c25a-43df-8ce0-c205f2879282",
      title: "Pedro navaja",
      content: "pedro navaja",
      likes: 1,
      userId: "d46ed554-caa4-4096-91a8-6741b8b47c47",
      date: "2013-10-10T14:48:00.000Z",
    },
    {
      id: "243d55c1-c25a-43df-8ce0-c205f287928d2",
      title: "Juan pedro",
      content: "Juam pedro",
      likes: 3,
      userId: "d46ed554-caa4-4096-91a8-6741b8b47c47",
      date: "2013-10-10T14:48:00.000Z",
    },
  ];
  private mutex = new Mutex();

  async create(post: Post): Promise<PrimitivePost> {
    const release = await this.mutex.acquire();
    console.log(this.posts);
    try {
      this.posts.push(post.toValue());
      return post.toValue();
    } finally {
      release();
    }
  }

  async findOneById(id: UUID): Promise<PrimitivePost | null> {
    const post = this.posts.find(post => post.id === id);
    return post ? post : null;
  }

  async delete(id: UUID): Promise<void> {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }

  async findAll(): Promise<PrimitivePost[]> {
    return this.posts.map(post => post);
  }

  async findAllByUserId(userId: UUID): Promise<PrimitivePost[] | null> {
    const post = this.posts.find(post => post.userId === userId);
    console.log(post);

    return post ? this.posts.map(post => post) : null;
  }

  async like(id: UUID): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      const post = this.posts.find(post => post.id === id);
      if (!post) {
        throw new PostNotFoundException(id);
      }
      post.likes = post.likes + 1;
    } catch (error) {
      throw error;
    } finally {
      release();
    }
  }

  async unlike(id: UUID): Promise<void> {
    const release = await this.mutex.acquire();
    console.log("heree");
    try {
      const post = this.posts.find(post => post.id === id);
      if (!post) {
        throw new PostNotFoundException(id);
      }
      post.likes = post.likes - 1;
    } finally {
      release();
    }
  }
}
