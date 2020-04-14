import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Expense } from '../expense-entry/expense.interface'

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  getExpenses(){
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.db.collection<Expense>('expenses', ref => ref.where('uid','==', user.uid))
                  .valueChanges({
                    idField: 'id'
                  })
        }
      })
    )
  }
}