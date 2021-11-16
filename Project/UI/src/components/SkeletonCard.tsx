import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFooter, IonSkeletonText, IonToolbar, IonButtons } from "@ionic/react";
import React from "react";

 const SkeletonCard = (props: any) => {
    return (
        <>
            <IonCard>
            <div className="ion-padding custom-skeleton">
            <IonSkeletonText animated style={{ width: '60%' }} />
            <IonSkeletonText animated />
            <IonSkeletonText animated style={{ width: '88%' }} />
            <IonSkeletonText animated style={{ width: '70%' }} />
            <IonSkeletonText animated style={{ width: '60%' }} />
          </div>
                <IonCardHeader>
                    <IonCardSubtitle><IonSkeletonText animated style={{"width": "100%"}}></IonSkeletonText></IonCardSubtitle>
                    <IonCardTitle><IonSkeletonText animated></IonSkeletonText></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonSkeletonText animated></IonSkeletonText>  
                </IonCardContent>
                <IonFooter>
                    <IonToolbar>
                        <IonButtons>
                            <IonSkeletonText animated></IonSkeletonText>
                        </IonButtons>
                    </IonToolbar>
                </IonFooter>
            </IonCard>
        </>
    )
 };

 export default SkeletonCard;