import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  form: FormGroup;
  loading = false;
  type: 'login' | 'signup' | 'reset' = 'signup';
  serverMessage: string;
  constructor( private afAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
      passwordConfirm:['',[]] 
    })
  }


 // check what the user is trying to do based on the type defined above
  changeType(val) {
    this.type = val
  } 

  // getter methods for our form
  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset'
  }

  // getters for info from form when submitted
  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm')
  }

  // checks the password field and the password confirm field
  // to find equal values
  get passwordMatch() {
    if (this.type !== 'signup') {
      return true
    } else{
      return this.password.value === this.passwordConfirm.value
    }
  }

  async onSubmit() {

    this.loading = true;
    const email = this.email.value 
    const password = this.password.value

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email,password) 
      } else if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email,password)
      } else if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your Email'
      }
    } catch (error) {
      this.serverMessage = error
    }
    this.loading = false;
  }
}