import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from '../expense-entry/expense.interface';

// Import for dialog form
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { database } from 'firebase';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: AngularFirestore
  ) { }

  expFormDg = new FormGroup({
    expFirst: new FormControl('', [Validators.required]),
    expLast: new FormControl('', [Validators.required]),
    expTravel: new FormControl('', [Validators.required]),
    expHotel: new FormControl('', [Validators.required]),
    expTotal: new FormControl('', [Validators.required])

  })

  sendUpdate(){
    console.log(this.data.indexData)
    console.log(this.data.fbdocumentId)
    this.db.collection('todos').doc(this.data.fbdocumentId)
                               .update({
                                expFirst: this.expFormDg.value.expFirst,
                                expLast: this.expFormDg.value.expLast,
                                expTravel: this.expFormDg.value.expTravel,
                                expHotel: this.expFormDg.value.expHotel,
                                expTotal: this.expFormDg.value.expTotal
                               })
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
