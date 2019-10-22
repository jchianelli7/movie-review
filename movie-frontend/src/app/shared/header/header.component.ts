import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginEmail: string;
  loginPassword: string;
  isValid: boolean;
  loginForm: FormGroup;


  constructor(private userService: UserService, private formBuilder: FormBuilder,
  ) {
    this.createLoginForm()
  }

  ngOnInit() {
  }

  /**
   * Method to login user into the system.
   */
  login() {
    this.userService.login({email: this.loginEmail, password: this.loginPassword})
      .subscribe(result => {
        result === 'Error, could not login user' ? this.isValid = false : this.isValid = true;

        if (this.isValid) {
          window.location.href = '/home';
        }
      });
  }

  /**
   * Method to create the form that the user submits in order to attempt to login
   */
  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
