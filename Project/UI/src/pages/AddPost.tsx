import { 
    IonTextarea,
    IonContent,
    IonInput,
    } 
    from '@ionic/react';

    import { thumbsUp} from 'ionicons/icons';
import React, { useState } from 'react';

class AddPost extends React.Component<any, any> {
    render() {
        return (
            <IonContent>
                <IonInput placeholder="post title"></IonInput>
                <IonTextarea placeholder="Your message here">
                </IonTextarea>
            </IonContent>
        );
    }
}

export default AddPost;