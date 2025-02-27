import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-teacher-signup',
  standalone: true,
    imports: [
        CommonModule,
        Button,
        Card,
        FormsModule,
        InputText,
        ReactiveFormsModule,
        RouterLink,
        TranslatePipe
    ],
  templateUrl: './teacher-signup.component.html',
  styleUrl: './teacher-signup.component.css'
})
export class TeacherSignupComponent {

}
