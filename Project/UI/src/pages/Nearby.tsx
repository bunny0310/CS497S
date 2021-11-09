import { IonContent, IonSpinner } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import PostCard from '../components/PostCard';
import { Post, PostsWebservice, VoteType } from '../services/posts-webservice';
import { wire } from '../services/serviceInjection';

interface NearbyProps extends RouteComponentProps{};
interface NearbyPropsWithServices extends NearbyProps {
    postsWebService: PostsWebservice;
}
interface NearbyState {
    loading: boolean;
    posts: Post[];
}
class Nearby extends React.Component<NearbyPropsWithServices, NearbyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            posts: []
        }
    }
    componentDidMount() {
        this.setState({...this.state, loading: true});
        this.setState({
            ...this.state,
            loading: true
        })
        this.fetchPosts();
    }

    fetchPosts = () => {
        this.props.postsWebService
        .getTrendingPosts()
        .then((posts) => {
            // this.setState({
            //     posts: posts,
            //     loading: false
            // });
            this.props.postsWebService
            .getVoteStatus(posts.map(post => post.id), VoteType.Post)
            .then(filteredPostIds => {
               posts = posts.map(post => {
                   const mappedPost : Post = {
                       ...post,
                       isVoted: filteredPostIds.includes(post.id)
                   }
                   return mappedPost
               })
                this.setState({
                    posts,
                    loading: false
                });
            })
        });
    }
    render() {
        const posts: Post[] = this.state.posts
        return (
            <IonContent>
                {
                    !this.state.loading
                    ? posts.map((post) => {
                        return <PostCard {...this.props} description={post.description} id={post.id} isVoted={post.isVoted} key={post.id} votes={post.votes}></PostCard>;
                    })
                    : 
                    <>
                    <IonSpinner className={"loadingSpinner"}/>
                    </>
                }
            </IonContent>
        )
    }
}

export default wire<NearbyProps>(Nearby, ["postsWebService"]);