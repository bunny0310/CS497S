import { IonInput, IonLabel, IonText } from "@ionic/react";
import React from "react";

interface InputProps {
    isValid: boolean,
    onChange: (event: CustomEvent) => any
    placeholder: string,
    validationMessage?: string
}

const IonInputWrapper = (props: InputProps) => {
    const {isValid, onChange, placeholder, validationMessage} = props;
    const [showValidationError, setShowValidationError] = React.useState<boolean>(false);
    return (
    <>
        {showValidationError && !isValid && validationMessage && <IonText color={"danger"}><h6>{validationMessage}</h6></IonText>}
        <IonInput onIonBlur={() => {setShowValidationError(true)}} onIonChange={onChange} placeholder={placeholder} style={{"border": "0.2px solid"}}></IonInput>

    </>
    );
}

export default IonInputWrapper;