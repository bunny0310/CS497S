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
import IonInputWrapper from '../components/IonInputWrapper';

interface AddPostState {
    isDescriptionValid : boolean;
    isTitleValid : boolean;
}

class AddPost extends React.Component<any, AddPostState> {
    constructor (props : any) {
        super(props);
        this.state = {
            isDescriptionValid : false,
            isTitleValid : false
        };
    }

    descriptionHandler = (event : CustomEvent) => {
        const val = event.detail.value.trim();
        if (val.length < 5) {
            this.setState({
                ...this.state,
                isDescriptionValid: false
            })
        } else {
            this.setState({
                ...this.state,
                isDescriptionValid: true
            })        
        }
    }

    titleHandler = (event : CustomEvent) => {
        const val = event.detail.value.trim();
        if (val.length < 5) {
            this.setState({
                ...this.state,
                isTitleValid: false
            })
        } else {
            this.setState({
                ...this.state,
                isTitleValid: true
            })        
        }
    }

    render() {
        const isFormValid = this.state.isDescriptionValid && this.state.isTitleValid;
        return (
            <IonContent>
                <IonText color="dark" className={"centered"}>
                    <h2>Add Post</h2>
                </IonText>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonInputWrapper 
                                isValid = {this.state.isTitleValid} 
                                onChange={this.titleHandler} 
                                placeholder="Post Title"
                                validationMessage="Please enter a valid title."
                                ></IonInputWrapper>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonTextarea onIonChange={this.descriptionHandler} placeholder="Your Description Here" style={{"border": "0.2px solid"}}>
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