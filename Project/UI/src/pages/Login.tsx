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

interface LoginProps extends RouteComponentProps{
    loginStateHandler: () => void;
}
interface LoginState {
    isLoggingIn: boolean;
    isPrivateKeyValid : boolean;
    isPublicKeyValid : boolean;
    privateKey: string;
    publicKey: string;
    showLogInToast: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
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
        this.setState({
            ...this.state,
            isLoggingIn: true
        });  

        login()
        .then(() => {
            this.setState({
                ...this.state,
                showLogInToast: true
            })
        })
        .catch((err) => {
            clearMemory();
            console.log(err);
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
                        this.props.loginStateHandler();
                        this.props.history.push("/tabs/nearby");
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
                            isValid = {this.state.isPublicKeyValid} 
                            onChange={this.publicKeyHandler} 
                            placeholder="Public Key"
                            validationMessage="Please enter a valid public key."
                        ></IonInputWrapper>
                        <IonInputWrapper 
                            isValid = {this.state.isPrivateKeyValid}
                            onChange = {this.privateKeyHandler}
                            placeholder="Private Key"
                            validationMessage="Please enter a valid private key"
                        ></IonInputWrapper>
                    </IonCardContent>
                    <IonFooter>
                        <IonToolbar>
                            <IonButton color={"secondary"} disabled={!isFormValid} expand={"block"} fill={"solid"} onClick={this.submitHandler}>Login</IonButton>
                            <IonButton color={"light"} expand={"block"} fill={"solid"} onClick={this.registerHandler}>Register</IonButton>
                        </IonToolbar>
                    </IonFooter>
                </IonCard>
            </IonContent>
        );
    }
}

export default Login;