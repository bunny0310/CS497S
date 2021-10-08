import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import * as secp from "noble-secp256k1";


const Home: React.FC = () => {

const keyGenMethod = async () => {
  let payload = {
    data: "message",
    lat: 1,
    long: 1
  };
  const message = JSON.stringify(payload);
  const privateKey = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
  const messageHash = "9c1185a5c5e9fc54612808977ee8f548b2258d31";
  const publicKey = secp.getPublicKey(privateKey);
  const signature = await secp.sign(messageHash, privateKey);
  const isSigned = secp.verify(signature, messageHash, publicKey);
  console.log(secp.getSharedSecret(privateKey, publicKey));
} 
keyGenMethod();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ishaan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
