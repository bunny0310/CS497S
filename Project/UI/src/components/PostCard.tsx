import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFooter, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonList, IonContent, IonTitle, IonSpinner, IonProgressBar, IonText, IonToast } from "@ionic/react";
import { thumbsUpSharp, thumbsUpOutline, chatbubblesSharp, chatbubbleOutline } from "ionicons/icons";
import React from "react";
import { Comment, Post, PostsWebservice, VoteType } from "../services/posts-webservice";
import { wire } from "../services/serviceInjection";
import moment from 'moment';
import { RouteComponentProps } from "react-router";
import { LoggedInContext } from "./LoggedInContext";
import IonTextareaWrapper from "./IonTextareaWrapper";
import IonInputWrapper from "./IonInputWrapper";
import { pubKeyName } from "../services/authentication-service";

interface PostCardProps extends RouteComponentProps{
    post: Post
};

interface PostCardPropsWithServices extends PostCardProps {
    postsWebService: PostsWebservice;
};

enum CommentCreationStatus {
    DEFAULT,
    FAIL,
    INPROGRESS,
    SUCCESS
}

interface PostCardState {
    commentCreationStatus: CommentCreationStatus
    comments: Comment[];
    commentsLoading: boolean;
    isCommentValid: boolean;
    isVoted: boolean;
    newComment: string;
    showComments: boolean;
    votes: number;
}

class PostCard extends React.Component<PostCardPropsWithServices, PostCardState> {
    constructor(props: PostCardPropsWithServices) {
        super(props);
        this.state = {
            commentCreationStatus: CommentCreationStatus.DEFAULT,
            comments: [],
            commentsLoading: false,
            isCommentValid: false,
            isVoted: props.post.isVoted,
            newComment: "",
            showComments: false,
            votes: props.post.votes,
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

    newCommentChangeHandler = async (event: CustomEvent) => {
        const val = event.detail.value;
        if (val.length < 5) {
            this.setState({
                ...this.state,
                isCommentValid: false,
                newComment: val,
            })
        } else {
            this.setState({
                ...this.state,
                isCommentValid: true,
                newComment: val,
            })           
        }
    }

    newCommentSubmitHandler = async () => {
        const comment : Comment= {
            postId: this.props.post.id,
            secretKey: window.localStorage.getItem(pubKeyName)!,
            value: this.state.newComment
        }
        try {
            const newComment = await this.props.postsWebService.createComment(comment);
            let commentsList = this.state.comments;
            console.log(newComment);
            commentsList.push(newComment);
            this.setState({
                ...this.state,
                commentCreationStatus: CommentCreationStatus.SUCCESS,
                comments: commentsList,
                newComment: ""
            });
        } catch(err: any) {
            console.log(err);
            this.setState({
                ...this.state,
                commentCreationStatus: CommentCreationStatus.FAIL,
                newComment: ""
            });
        }
    }
    static contextType = LoggedInContext;
    render() {
        const comments: Comment[] = this.state.comments;
        return (
        <>
            <IonToast
                isOpen={this.state.commentCreationStatus === CommentCreationStatus.FAIL || this.state.commentCreationStatus === CommentCreationStatus.SUCCESS}
                onDidDismiss={() => {
                    this.setState({
                        ...this.state,
                        commentCreationStatus: CommentCreationStatus.DEFAULT
                    })
                }}
                message = {this.state.commentCreationStatus === CommentCreationStatus.SUCCESS ? "Comment created successfully." : "Cannot create a new comment."}
                duration={2000}
                color={this.state.commentCreationStatus === CommentCreationStatus.SUCCESS ? "success" : "danger"}
            />
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    <IonCardTitle>Card Title</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {this.props.post.description}
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
                                this.props.postsWebService.upvote(this.props.post, VoteType.Post)
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
                                        this.loadComments(this.props.post.id);
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
                {this.state.showComments && !this.state.commentsLoading && <>
                    <IonList>
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
                    </IonList>
                    <IonCard>
                        <IonFooter>
                            <IonToolbar>
                                <IonInputWrapper isValid = {this.state.isCommentValid} onChange={this.newCommentChangeHandler} placeholder = "Enter a comment." validationMessage = {"A comment should be at least 5 characters long."} value={this.state.newComment}></IonInputWrapper>
                            </IonToolbar>
                            <IonToolbar>
                                <IonButtons slot="end">
                                    <IonButton color={"primary"} fill={"solid"} disabled={!this.state.isCommentValid} onClick={() => {
                                            if (!this.context) {
                                                this.props.history.push("/login");
                                                return;
                                            }
                                            this.setState({
                                                ...this.state,
                                                commentCreationStatus: CommentCreationStatus.INPROGRESS
                                            });
                                            this.newCommentSubmitHandler();
                                        }
                                    }>
                                        {this.state.commentCreationStatus === CommentCreationStatus.INPROGRESS ? "Adding comment... " : "Add Comment"}
                                        {this.state.commentCreationStatus === CommentCreationStatus.INPROGRESS && <IonSpinner></IonSpinner>}
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonFooter>
                    </IonCard>
                </>}
                </IonFooter>
            </IonCard>
        </>
        );
    }
}
export default wire<PostCardProps>(PostCard, ["postsWebService"]);

