import { 
    IonToolbar, 
    IonCard, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardContent, 
    IonIcon, 
    IonButton, 
    IonFooter,
    IonButtons,
    IonLabel} 
    from '@ionic/react';

    import { thumbsUp} from 'ionicons/icons';
import React from 'react';

class Nearby extends React.Component<any, any> {

    render() {
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    <IonCardTitle>Card Title</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
                </IonCardContent>
                <IonFooter>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton>
                            <IonIcon slot="start" icon={thumbsUp}/>
                            <IonLabel>5</IonLabel>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                </IonFooter>
            </IonCard>
        );
    }
}

export default Nearby;