import axios from "axios";

const getComments = async (id: number) => {
    const response = await axios.get<Comment[]>(`http://localhost/posts_service/api/Posts/Comments/${id}`);
    const comments = response.data;
    return comments;
}
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
export const getTrendingPosts = async () => {
    const response = await axios.get<ExecutionOutcome<Post[]>>(`http://localhost/posts_service/api/Posts/GetTrending`);
    const result = await response.data;
    return result.data;
}