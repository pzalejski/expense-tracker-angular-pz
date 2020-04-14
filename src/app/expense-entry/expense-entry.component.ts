import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Expense } from '../expense-entry/expense.interface';
import { ExpService } from '../services/exp.service';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss']
})
export class ExpenseEntryComponent implements OnInit {

  userId: string;
  expenses: Expense[];
  
  constructor(private afs: AngularFirestore, private auth: AuthService, public expService: ExpService, public dialog: MatDialog) { }
  
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

  showExpenses() {
    this.expService.getExpenses().subscribe(expenses => {
      console.log(expenses)
      this.expenses = expenses;
    })
  }

  openDialog(expIndex: string, documentId: string) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '250px',
      data: { indexData: expIndex, fbdocumentId: documentId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog has been closed')
    })
  }

  deleteInfo(documentId: string) {
    this.afs.collection('expenses').doc(documentId).delete();
  }

  ngOnInit(): void {
    this.saveUserInfo()
  }

}
