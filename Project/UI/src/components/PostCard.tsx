import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFooter, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonList, IonContent, IonTitle, IonSpinner, IonProgressBar, IonText } from "@ionic/react";
import { thumbsUpSharp, chatbubblesSharp, chatbubbleOutline } from "ionicons/icons";
import React from "react";
import { Comment, PostsWebservice } from "../services/posts-webservice";
import { wire } from "../services/serviceInjection";
import moment from 'moment';

interface PostCardProps {
    id: number;
    description: string;
    votes: number;
};

interface PostCardPropsWithServices extends PostCardProps {
    postsWebService: PostsWebservice;
};

interface PostCardState {
    comments: Comment[];
    commentsLoading: boolean;
    showComments: boolean;
}

class PostCard extends React.Component<PostCardPropsWithServices, PostCardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: false,
            showComments: false
        };
    }

    loadComments = async (postId: number) => {
        this.props.postsWebService.getComments(postId)
        .then(comments => {
            this.setState({
                ...this.state,
                comments: comments,
                commentsLoading: false
            })
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                ...this.state,
                comments: [],
                commentsLoading: false
            })  
        })
    }
    render() {
        const comments: Comment[] = this.state.comments;
        return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                <IonCardTitle>Card Title</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {this.props.description}
            </IonCardContent>
            <IonFooter>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton>
                        <IonIcon slot="start" icon={thumbsUpSharp} color={"secondary"}/>
                        <IonLabel>{this.props.votes}</IonLabel>
                    </IonButton>
                    <IonButton
                        onClick={() => {
                            this.setState({...this.state, showComments: !this.state.showComments}, () => {
                                if (this.state.showComments) {
                                    this.setState({
                                        ...this.state,
                                        commentsLoading: true
                                    })
                                    this.loadComments(this.props.id);
                                }
                            });
                        }}
                    >
                        <IonIcon icon={this.state.showComments ? chatbubblesSharp : chatbubbleOutline} color={"secondary"}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            {this.state.showComments && this.state.commentsLoading && <>
                <IonProgressBar type="indeterminate"></IonProgressBar>
            </>}
            {this.state.showComments && !this.state.commentsLoading && <IonList>
                {
                    comments
                    .map((comment) => {
                        return (
                            <>
                                <IonCard key={comment.id}>
                                    <IonCardHeader>
                                        <IonCardSubtitle>{moment(comment.createdAt).format('MMMM DD, YYYY')}</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonText color="dark">{comment.value}</IonText>
                                    </IonCardContent>
                                </IonCard>
                            </>
                        )
                    })
                }
            </IonList>}
            </IonFooter>
        </IonCard>
        );
    }
}
export default wire<PostCardProps>(PostCard, ["postsWebService"]);

