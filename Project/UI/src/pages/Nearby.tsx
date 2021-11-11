import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner } from '@ionic/react';
import { server } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import PostCard from '../components/PostCard';
import SkeletonCard from '../components/SkeletonCard';
import { Post, PostsWebservice, VoteType } from '../services/posts-webservice';
import { wire } from '../services/serviceInjection';

interface NearbyProps extends RouteComponentProps{};
interface NearbyPropsWithServices extends NearbyProps {
    postsWebService: PostsWebservice;
}
interface NearbyState {
    infiniteDisabled: boolean;
    loading: boolean;
    posts: Post[];
}
class Nearby extends React.Component<NearbyPropsWithServices, NearbyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            infiniteDisabled: false,
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

    loadMoreContent = (ev: any, limit: number = 5, offset: number = 0) => {
        setTimeout(() => {
            console.log(`The offset is ${offset}`);
            this.fetchPosts(limit, offset);
            ev.target.complete();
        }, 500);
    }
    fetchPosts = (limit: number = 5, offset: number = 0) => {
        this.props.postsWebService
        .getTrendingPosts(offset, limit) 
        .then((serverPosts) => {
            if (serverPosts.length > 0)
                this.props.postsWebService
                .getVoteStatus(serverPosts.map(post => post.id), VoteType.Post)
                .then(filteredPostIds => {
                    serverPosts = serverPosts.map(post => {
                    const mappedPost : Post = {
                        ...post,
                        isVoted: filteredPostIds.includes(post.id)
                    }
                    return mappedPost
                })
               const updatedPosts = this.state.posts.concat(serverPosts);
               console.log(`updated Posts length is ${updatedPosts.length}`);
                this.setState({
                    infiniteDisabled: (serverPosts.length === 0 || this.state.posts.length + serverPosts.length >= 500),
                    posts: updatedPosts,
                    loading: false
                });
            })
        });
    }
    render() {
        const posts: Post[] = this.state.posts
        const skeletonCards : Array<any>  = new Array(3);
        skeletonCards.fill(<SkeletonCard></SkeletonCard>)
        return (
            <IonContent>
                {
                    !this.state.loading
                    ? posts.map((post) => {
                        return <PostCard {...this.props} description={post.description} id={post.id} isVoted={post.isVoted} key={post.id} votes={post.votes}></PostCard>;
                    })
                    : 
                    <>
                    {/* <IonSpinner className={"loadingSpinner"}/> */}
                    {
                        skeletonCards.map(skeletonCard => {
                            return skeletonCard;
                        })
                    }
                    </>
                }
                <IonInfiniteScroll
                    onIonInfinite = {(ev: any) => this.loadMoreContent(ev, 5, this.state.posts.length)}
                    threshold="100px"
                    disabled={this.state.infiniteDisabled}
                >
                    <IonInfiniteScrollContent
                    loadingSpinner="bubbles"
                    loadingText="Loading more data..."
                    ></IonInfiniteScrollContent>
                </IonInfiniteScroll>
                </IonContent>
        )
    }
}

export default wire<NearbyProps>(Nearby, ["postsWebService"]);