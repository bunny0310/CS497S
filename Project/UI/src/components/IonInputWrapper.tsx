import { IonInput, IonLabel, IonText } from "@ionic/react";
import React from "react";
import "./FieldStyles.css";

export interface InputProps {
    disabled? : boolean,
    isValid: boolean,
    onChange: (event: CustomEvent) => any
    placeholder: string,
    validationMessage?: string,
    value?: string
}

const IonInputWrapper = (props: InputProps) => {
    const {disabled, isValid, onChange, placeholder, validationMessage, value} = props;
    const [showValidationError, setShowValidationError] = React.useState<boolean>(false);
    const [fieldClassName, setFieldClassName] = React.useState<string>("field-normal");

    const blurHandler = () => {
        setShowValidationError(true);
        if (!isValid) {
            setFieldClassName("field-error");
        }
        else {
            setFieldClassName("field-active");
        }
    }

    const changeHandler = (event: CustomEvent) => {
        onChange(event);
        if (isValid) {
            setShowValidationError(false);
            setFieldClassName("field-active");
        } else {
            setShowValidationError(true);
            setFieldClassName("field-error");
        }
    }

    return (
    <>
        {showValidationError && !isValid && validationMessage && <IonText color={"danger"}><h6>{validationMessage}</h6></IonText>}
        <IonInput className={`adjustSpace ${fieldClassName}`} disabled={disabled ?? false} onIonBlur={blurHandler} onIonChange={changeHandler} placeholder={placeholder} style={{"width": "auto"}} value={value}></IonInput>
    </>
    );
}

export default IonInputWrapper;