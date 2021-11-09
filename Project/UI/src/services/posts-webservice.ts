import axios from "axios";
import { pubKeyName } from "./authentication-service";

export interface ExecutionOutcome<T> {
    code: number;
    data: T;
    message: string;
}
export interface Post {
    id: number;
    isVoted: boolean;
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

export enum VoteType {
    Comment,
    Post
}
export interface VoteRequest {
    id?: number,
    objectIds?: number[],
    pubKey: string,
    type: string
}

export interface VoteResponse {
    data?: Array<number>,
    msg: string,
    isVoted?: boolean
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
    upvote = async (id: number, type: VoteType) => {
        const voteRequest : VoteRequest= {
            id,
            pubKey: window.localStorage.getItem(pubKeyName) ?? '',
            type: VoteType[type]
        }
        const response = await axios.post<VoteRequest, VoteResponse>('http://localhost/votes_service/vote', voteRequest);
        return response.msg;
    }

    getVoteStatus = async (ids: number[], type: VoteType) => {
        const voteRequest : VoteRequest= {
            objectIds: ids,
            pubKey: window.localStorage.getItem(pubKeyName) ?? '',
            type: VoteType[type]
        }
        const response = await axios.post<any>('http://localhost/votes_service/isVoted', voteRequest);
        const result = await response.data!;
        return result.data;   
    }
}