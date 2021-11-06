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
import IonTextareaWrapper from '../components/IonTextareaWrapper';
import { login } from '../services/authentication-service';

interface AddPostState {
    description: string;
    isDescriptionValid : boolean;
    isTitleValid : boolean;
    title: string;
}

class AddPost extends React.Component<any, AddPostState> {
    constructor (props : any) {
        super(props);
        this.state = {
            description : "",
            isDescriptionValid : false,
            isTitleValid : false,
            title : ""
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
                description: val,
                isDescriptionValid: true
            })
        }
    }

    submitHandler = () => {
        login();
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
                isTitleValid: true,
                title: val
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
                        <IonTextareaWrapper 
                            isValid = {this.state.isDescriptionValid}
                            onChange = {this.descriptionHandler}
                            placeholder="Your Description Here"
                            validationMessage="Please enter a valid description"
                        ></IonTextareaWrapper>
                    </IonCardContent>
                    <IonFooter>
                        <IonToolbar>
                            <IonButton color={"secondary"} disabled={!isFormValid} expand={"block"} fill={"solid"} onClick={this.submitHandler}>Add Post</IonButton>
                        </IonToolbar>
                    </IonFooter>
                </IonCard>
            </IonContent>
        );
    }
}

export default AddPost;