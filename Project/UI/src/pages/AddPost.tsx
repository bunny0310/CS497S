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
    IonButton,
    IonSpinner
    }
    from '@ionic/react';
import "./AddPost.css";
import React, { FormEventHandler, useState } from 'react';
import IonInputWrapper from '../components/IonInputWrapper';
import IonTextareaWrapper from '../components/IonTextareaWrapper';
import { clearMemory, login } from '../services/authentication-service';

interface AddPostState {
    description: string;
    isAdding: boolean;
    isDescriptionValid : boolean;
    isTitleValid : boolean;
    title: string;
}

class AddPost extends React.Component<any, AddPostState> {
    constructor (props : any) {
        super(props);
        this.state = {
            description : "",
            isAdding: false,
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
        this.setState({
            ...this.state,
            isAdding: true
        });   
        login()
        .then(() => {
            this.setState({
                ...this.state,
                isAdding: false
            });
        })
        .catch((err) => {
            this.setState({
                ...this.state,
                isAdding: false
            });
            clearMemory();
            console.log(err);
        });
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
                
                    <h2>Add Post {this.state.isAdding ? "true" : "false"}</h2> {this.state.isAdding && <h1>Cool</h1>}
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