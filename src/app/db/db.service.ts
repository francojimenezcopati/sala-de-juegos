import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../chat/message.interface'

@Injectable({
    providedIn: 'root',
})
export class DbService {
    firestore = inject(AngularFirestore);

    constructor() {
        // this.getDocument('').subscribe((object) => {
        //     console.log(object.data());
        // });

		// this.getCollection("messages").get().subscribe((messages)=> {
		// 	messages.docs.forEach((message) => {
		// 		console.log("Message: " + message.data());
		// 	})
		// })
    }

    public getDocument(documentPath: string) {
        return this.firestore.doc(documentPath).get();
    }

    public getCollection(collectionPath: string) {
        return this.firestore.collection(collectionPath);
    }

	public async addDocument(collectionPath: string, data:any){
		this.firestore.collection(collectionPath).add(data)
	}
}
