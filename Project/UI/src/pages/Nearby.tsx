import { IonContent, IonSpinner } from '@ionic/react';
import React from 'react';
import PostCard from '../components/PostCard';
import { getTrendingPosts, Post } from '../services/posts-webservice';

interface NearbyState {
    loading: boolean;
    posts: Post[];
}
class Nearby extends React.Component<any, NearbyState> {
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
        getTrendingPosts()
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

export default Nearby;