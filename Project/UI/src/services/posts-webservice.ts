import axios from "axios";

export interface ExecutionOutcome<T> {
    code: number;
    data: T;
    message: string;
}
export interface Post {
    id: number;
    description: string;
    latitude: number;
    longitude: number;
    secretKey: string;
    votes: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: number,
    postId: number,
    value: string,
    secretKey: string,
    createdAt: Date,
    updatedAt: Date
}

export interface PostRequest {
    description: string;
    hash: string;
    latitude: string;
    longitude: string;
    publicKey: string;
} 

export class PostsWebservice {
    getComments = async (id: number) => {
        const response = await axios.get<ExecutionOutcome<Comment[]>>(`http://localhost/comments_service/api/Comments/Comments/${id}`);
        const result = await response.data;
        return result.data;
    }
    getTrendingPosts = async () => {
        const response = await axios.get<ExecutionOutcome<Post[]>>(`http://localhost/posts_service/api/Posts/GetTrending`);
        const result = await response.data;
        return result.data;
    }
    createPost = async (body: PostRequest) => {
        const response = await axios.post<PostRequest>(`http://localhost/posts_service/api/Posts/Create`, body);
    }
}