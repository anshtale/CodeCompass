// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { error } from "console";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "gitchat-e02a8",
  storageBucket: "gitchat-e02a8.firebasestorage.app",
  messagingSenderId: "831482209057",
  appId: "1:831482209057:web:43d7f4c34a5fae375c1460",
  measurementId: "G-V20ZH9R3RP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export async function uploadFile(file:File, setProgress? : (progress:number)=> void){
    return new Promise((resolve,reject)=>{
        try {
            const storageRef = ref(storage,file.name)
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on('state_changed',snapshot=>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)

                if(setProgress) setProgress(progress)
                switch(snapshot.state){
                    case 'paused':
                        console.log('upload is paused'); break;
                    case 'running':
                        console.log('upload is running'); break;
                }

            },error =>{
                reject(error)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
                    resolve(downloadUrl)
                })
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}