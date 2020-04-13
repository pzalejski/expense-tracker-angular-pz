import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss']
})
export class ExpenseEntryComponent implements OnInit {

  userId: string;
  constructor(private afs: AngularFirestore, private auth: AuthService) { }
  
  saveUserInfo() {
    this.auth.getUserInfo().subscribe(user => {
      console.log(user.uid);
      this.userId = user.uid
    })
  }

  expForm = new FormGroup({
    expFirst: new FormControl('', [Validators.required]),
    expLast: new FormControl('', [Validators.required]),
    expTravel: new FormControl('', [Validators.required]),
    expHotel: new FormControl('', [Validators.required]),
    expTotal: new FormControl('', [Validators.required])
    
  })
  
  onSubmit() {

    this.afs.collection('expenses').add({
      uid: this.userId,
      expFirst: this.expForm.value.expFirst,
      expLast: this.expForm.value.expLast,
      expTravel: this.expForm.value.expTravel,
      expHotel: this.expForm.value.expHotel,
      expTotal: this.expForm.value.expTotal

    })
  }

  ngOnInit(): void {
    this.saveUserInfo()
  }

}
