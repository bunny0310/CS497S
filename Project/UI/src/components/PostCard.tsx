import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFooter, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonList } from "@ionic/react";
import { thumbsUpSharp, chatbubblesSharp } from "ionicons/icons";
import React from "react";

interface PostCardProps {
    description: string;
    votes: number;
};

interface PostCardState {
    showComments: boolean;
}

class PostCard extends React.Component<PostCardProps, PostCardState> {
    constructor(props: PostCardProps) {
        super(props);
        this.state = {
            showComments: false
        };
    }
    render() {
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
                        onClick={() => this.setState({...this.state, showComments: !this.state.showComments})}
                    >
                        <IonIcon icon={chatbubblesSharp} color={"secondary"}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            {this.state.showComments && <IonList>
            <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>Mega Man X</IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>The Legend of Zelda</IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>Pac-Man</IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel>Super Mario World</IonLabel>
            </IonItem>
            </IonList>}
            </IonFooter>
        </IonCard>
        );
    }
}
export default PostCard;