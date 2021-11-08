import { IonInput, IonLabel, IonText, IonTextarea } from "@ionic/react";
import React from "react";
import { InputProps } from "./IonInputWrapper";

const IonTextareaWrapper = (props: InputProps) => {
    const {disabled, isValid, onChange, placeholder, validationMessage} = props;
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
        <IonTextarea className={fieldClassName} disabled = {disabled ?? false} onIonBlur={blurHandler} onIonChange={changeHandler} placeholder={placeholder}></IonTextarea>
    </>
    );
}

export default IonTextareaWrapper;