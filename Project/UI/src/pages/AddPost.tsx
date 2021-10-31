import { 
    IonTextarea,
    IonContent,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText
    } 
    from '@ionic/react';
import "./AddPost.css";
import React, { useState } from 'react';

class AddPost extends React.Component<any, any> {
    render() {
        return (
            <IonContent>
                <IonText color="dark" className={"centered"}>
                    <h2>Add Post</h2>
                </IonText>
                <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        <IonInput placeholder="post title"></IonInput>
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonTextarea placeholder="Your message here">
                    </IonTextarea>
                </IonCardContent>
                </IonCard>
            </IonContent>
        );
    }
}

export default AddPost;