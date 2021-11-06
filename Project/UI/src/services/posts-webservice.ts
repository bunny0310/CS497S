import axios from "axios";

interface ExecutionOutcome<T> {
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

export interface PostRequest {
    description: string;
    hash: string;
    latitude: string;
    longitude: string;
    publicKey: string;
} 

export class PostsWebservice {
    getComments = async (id: number) => {
        const response = await axios.get<Comment[]>(`http://localhost/posts_service/api/Posts/Comments/${id}`);
        const comments = response.data;
        return comments;
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