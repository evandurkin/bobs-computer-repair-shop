import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SignUpComponent implements OnInit {
  // styling variables
  color: ThemePalette = 'accent';
  background: ThemePalette = 'primary';

  // form variable
  newUserFormGroup: FormGroup;
  newUser: any;
  securityQuestions: any;

  constructor(
    private userService: UserService,
    private securityQuestionService: SecurityQuestionService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.newUserFormGroup = this.fb.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),

      securityQuestion1: new FormControl(null, Validators.required),
      securityQuestion1Answer: new FormControl(null, Validators.required),
      securityQuestion2: new FormControl(null, Validators.required),
      securityQuestion2Answer: new FormControl(null, Validators.required),
      securityQuestion3: new FormControl(null, Validators.required),
      securityQuestion3Answer: new FormControl(null, Validators.required),

      userName: new FormControl(null, Validators.required),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ])
      ),
    });
    this.securityQuestionService.findAllSecurityQuestions().subscribe((res) => {
      this.securityQuestions = res['data'];
      console.log(this.securityQuestions);
    });
  }
  registerAccount() {
    //address is broken up in form so here we combine it for the DB schema
    let address1 = this.newUserFormGroup.get('address1').value.trim();
    let address2 = this.newUserFormGroup.get('address2').value.trim();
    let city = this.newUserFormGroup.get('city').value.trim();
    let state = this.newUserFormGroup.get('state').value.trim();
    let zip = this.newUserFormGroup.get('zip').value.trim();
    let fullAddress = `${address1}, ${address2}, ${city}, ${state} ${zip}`;

    let newSelectedSecurityQuestions = [
      {
        questionText: this.newUserFormGroup.controls.securityQuestion1.value,
        answerText: this.newUserFormGroup
          .get('securityQuestion1Answer')
          .value.trim(),
      },
      {
        questionText: this.newUserFormGroup.controls.securityQuestion2.value,
        answerText: this.newUserFormGroup
          .get('securityQuestion2Answer')
          .value.trim(),
      },
      {
        questionText: this.newUserFormGroup.controls.securityQuestion3.value,
        answerText: this.newUserFormGroup
          .get('securityQuestion3Answer')
          .value.trim(),
      },
    ];
    this.newUser = {
      firstName: this.newUserFormGroup.get('firstName').value.trim(),
      lastName: this.newUserFormGroup.get('lastName').value.trim(),
      phoneNumber: this.newUserFormGroup.get('phoneNumber').value.trim(),
      address: fullAddress,
      selectedSecurityQuestion: newSelectedSecurityQuestions,
      userName: this.newUserFormGroup.get('userName').value.trim(),
      password: this.newUserFormGroup.get('password').value.trim(),
    };
    console.log(this.newUser);
    this.userService.createUser(this.newUser).subscribe((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(this.newUser);
        // this.router.navigate(['/']);
      }
    });
  }

  // Tabs counter config;
  btnNextPrev = {
    prev: true,
    next: false,
    index: 0,
  };

  navig(n) {
    switch (n) {
      case 'next':
        {
          this.btnNextPrev.index++;
          if (this.btnNextPrev.index > 3) {
            this.btnNextPrev.prev = false;
            this.btnNextPrev.next = true;
          } else {
            this.btnNextPrev.prev = false;
          }
        }
        break;
      case 'prev':
        {
          this.btnNextPrev.index--;
          if (this.btnNextPrev.index == 0) {
            this.btnNextPrev.prev = true;
            this.btnNextPrev.next = false;
          } else {
            this.btnNextPrev.next = false;
          }
        }
        break;
    }
  }
}
