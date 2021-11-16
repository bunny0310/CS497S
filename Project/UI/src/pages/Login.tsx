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
    IonSpinner,
    useIonRouter,
    IonToast
    }
    from '@ionic/react';
import "./AddPost.css";
import React, { FormEventHandler, useState } from 'react';
import IonInputWrapper from '../components/IonInputWrapper';
import IonTextareaWrapper from '../components/IonTextareaWrapper';
import { clearMemory, login } from '../services/authentication-service';
import {RouteComponentProps} from 'react-router-dom';
import axios from 'axios';
import { ExecutionOutcome, Post } from '../services/posts-webservice';
import { MessageBus, Messages } from '../services/message-bus';
import { wire } from '../services/serviceInjection';

interface LoginProps extends RouteComponentProps {}
interface LoginPropsWithServices extends LoginProps{
    messageBus: MessageBus
}
interface LoginState {
    isLoggingIn: boolean;
    isPrivateKeyValid : boolean;
    isPublicKeyValid : boolean;
    privateKey: string;
    publicKey: string;
    showLogInToast: boolean;
}

class Login extends React.Component<LoginPropsWithServices, LoginState> {
    constructor (props : any) {
        super(props);
        this.state = {
            isLoggingIn: false,
            isPrivateKeyValid : false,
            isPublicKeyValid : false,
            privateKey : "",
            publicKey: "",
            showLogInToast: false
        };
    }

    privateKeyHandler = (event : CustomEvent) => {
        const val = event.detail.value.trim();
        if (val.length < 1) {
            this.setState({
                ...this.state,
                isPrivateKeyValid: false
            })
        } else {
            this.setState({
                ...this.state,
                privateKey: val,
                isPrivateKeyValid: true
            })
        }
    }

    publicKeyHandler = (event : CustomEvent) => {
        const val = event.detail.value.trim();
        if (val.length < 1) {
            this.setState({
                ...this.state,
                isPublicKeyValid: false
            })
        } else {
            this.setState({
                ...this.state,
                publicKey: val,
                isPublicKeyValid: true
            })
        }
    }

    submitHandler = () => {
       // For Mr. Thomas to implement
    }

    registerHandler = () => {
        login()
        .then(status => {
            this.setState({
                ...this.state,
                isLoggingIn: false,
                showLogInToast: true
            })
        });
    }

    render() {
        const isFormValid = this.state.isPublicKeyValid && this.state.isPrivateKeyValid;
        return (
            <IonContent>
                <IonToast
                    isOpen={this.state.showLogInToast}
                    onDidDismiss={() => {
                        this.setState({
                            ...this.state,
                            showLogInToast: false
                        })
                        this.props.messageBus.dispatch<string>(Messages.LoginMessage, "");
                        this.props.history.push("/tabs/trending");
                    }}
                    message="Logged in successfully."
                    duration={2000}
                />
                <IonText color="dark" className={"centered"}>
                    <h2> Login </h2>
                </IonText>
                <IonCard>
                    <IonCardContent>
                        <IonInputWrapper 
                            disabled = {this.state.isLoggingIn}
                            isValid = {this.state.isPublicKeyValid} 
                            onChange={this.publicKeyHandler} 
                            placeholder="Public Key"
                            validationMessage="Please enter a valid public key."
                        ></IonInputWrapper>
                        <IonInputWrapper
                            disabled = {this.state.isLoggingIn} 
                            isValid = {this.state.isPrivateKeyValid}
                            onChange = {this.privateKeyHandler}
                            placeholder="Private Key"
                            validationMessage="Please enter a valid private key"
                        ></IonInputWrapper>
                    </IonCardContent>
                    <IonFooter>
                        <IonToolbar>
                            <IonButton color={"secondary"} disabled={!isFormValid || this.state.isLoggingIn} expand={"block"} fill={"solid"} onClick={this.submitHandler}>Login</IonButton>
                            <IonButton color={this.state.isLoggingIn ? "dark" : "light"} disabled = {this.state.isLoggingIn} expand={"block"} fill={"solid"} onClick={() => {
                                this.setState({
                                    ...this.state,
                                    isLoggingIn: true
                                });
                                this.registerHandler();
                                }}>
                                    {
                                        this.state.isLoggingIn 
                                        ? "Registering... " 
                                        : "Register"
                                    }
                                    {this.state.isLoggingIn && <IonSpinner></IonSpinner>}
                            </IonButton>
                        </IonToolbar>
                    </IonFooter>
                </IonCard>
            </IonContent>
        );
    }
}

export default wire<LoginProps>(Login, ["messageBus"]);