# Authentication Service

## Purpose
The authentication service allows for users to prove they hold a private key without revealing their private key.

## How to use
While in the Project directory, ``docker-compose up -d`` will automatically build and run the authentication micorservice.

You may now interact with the container using ``http://localhost/authentication_service/<endpoint>``

When you are finished, run ``docker-compose down``. This will stop and remove all containers, but it will not remove the images.

## Endpoints
To login with a public key, use (GET) ``/login?pubKey=<your public key>``. This will request that the server encrypt a random string using your public key and send it back.

You may now use the decryption of this encrypted random string that you received as proof that you own the private key. At this point you should create your own cryptographically random string and hash it 50 times (saving the hash each time). You will send the final hash, your proof, and your public key using (GET) ``/prove?pubKey=<your public key>&proof=<the decrypted random string>&hash=<your final hash of your cryptographically random string>``. 

Now every time you interact with the site, you may pop the latest saved hash and send it, along with your public key to (GET) ``/auth?pubKey=<your public key>&hash=<The chosen hash>`` where the server will verify that the hash of this hash matches the last hash you told it to save. You may do this 50 times before needing to login again.

## Testing
There is a mock.js provided that mimicks client behaviour. This mock.js uses axios (which is not required for the rest of the microservice, so you may need to run ``npm install axios`` if running ``node mock.js`` or ``nodemon mock.js`` throw an exception.

You may interact with mock.js using port ``6000`` on localhost with the following endpoints:
* /createKey (POST) *optional:* {'secret': <string to be used to create keyPair>}
* /login (GET) (same as above enpoint)
* /auth (GET) (same as above enpoint)

There are console.logs throghought this mock that will make the behaviour more clear.

