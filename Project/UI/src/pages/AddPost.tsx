import { 
    IonTextarea,
    IonContent,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonFooter,
    IonToolbar,
    IonButton
    }
    from '@ionic/react';
import "./AddPost.css";
import React, { FormEventHandler, useState } from 'react';

interface AddPostState {
    isMessageValid : boolean;
    isTitleValid : boolean;
}

class AddPost extends React.Component<any, AddPostState> {
    constructor (props : any) {
        super(props);
        this.state = {
            isMessageValid : false,
            isTitleValid : false
        };
    }
    titleHandler (event : FormEventHandler<HTMLIonInputElement>) {
        console.log(event);
    }
    render() {
        const isFormValid = this.state.isMessageValid && this.state.isTitleValid;
        return (
            <IonContent>
                <IonText color="dark" className={"centered"}>
                    <h2>Add Post</h2>
                </IonText>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonInput onChange={this.titleHandler} placeholder="Post Title"></IonInput>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonTextarea placeholder="Your Description Here">
                        </IonTextarea>
                    </IonCardContent>
                    <IonFooter>
                        <IonToolbar>
                            <IonButton color={"secondary"} disabled={!isFormValid} expand={"block"} fill={"solid"}>Add Post</IonButton>
                        </IonToolbar>
                    </IonFooter>
                </IonCard>
            </IonContent>
        );
    }
}

export default AddPost;