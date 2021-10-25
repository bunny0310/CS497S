import { IonContent, IonSpinner } from '@ionic/react';
import React from 'react';
import PostCard from '../components/PostCard';
import { Post, PostsWebservice } from '../services/posts-webservice';
import { wire } from '../services/serviceInjection';

interface NearbyProps {};
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
        this.fetchPosts();
        this.setState({...this.state, loading: false});
    }

    fetchPosts = () => {
        this.props.postsWebService
        .getTrendingPosts()
        .then((data) => {
            console.log(data);
            this.setState({
                posts: data
            });
        });
    }
    render() {
        const posts: Post[] = this.state.posts;

        return (
            <IonContent>
                {
                    !this.state.loading
                    ? posts.map((post) => {
                        return <PostCard key={post.id} description={post.description} votes={post.votes}></PostCard>;
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