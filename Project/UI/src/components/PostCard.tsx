import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFooter, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonList, IonContent, IonTitle, IonSpinner, IonProgressBar, IonText } from "@ionic/react";
import { thumbsUpSharp, thumbsUpOutline, chatbubblesSharp, chatbubbleOutline } from "ionicons/icons";
import React from "react";
import { Comment, PostsWebservice, VoteType } from "../services/posts-webservice";
import { wire } from "../services/serviceInjection";
import moment from 'moment';
import { RouteComponentProps } from "react-router";
import { LoggedInContext } from "./LoggedInContext";

interface PostCardProps extends RouteComponentProps{
    id: number;
    isVoted: boolean;
    description: string;
    votes: number;
};

interface PostCardPropsWithServices extends PostCardProps {
    postsWebService: PostsWebservice;
};

interface PostCardState {
    isVoted: boolean;
    comments: Comment[];
    commentsLoading: boolean;
    showComments: boolean;
    votes: number;
}

class PostCard extends React.Component<PostCardPropsWithServices, PostCardState> {
    constructor(props: PostCardPropsWithServices) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: false,
            showComments: false,
            votes: props.votes,
            isVoted: props.isVoted
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
    static contextType = LoggedInContext;
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
                    <IonButton
                        onClick={() => {
                            if (!this.context) {
                                this.props.history.push("/login");
                                return;
                            }
                            const votes = this.state.votes;
                            this.props.postsWebService.upvote(this.props.id, VoteType.Post)
                            .then(resp => {
                                this.setState({
                                    ...this.state,
                                    isVoted: true,
                                    votes: votes + 1
                                })
                            })
                        }}
                    >
                        <IonIcon slot="start" icon={this.context
                            ? this.state.isVoted 
                                ? thumbsUpSharp 
                                : thumbsUpOutline
                            : thumbsUpOutline
                            } color={"secondary"}/>
                        <IonLabel>{this.state.votes}</IonLabel>
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

