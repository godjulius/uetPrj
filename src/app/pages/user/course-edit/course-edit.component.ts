import {Component, inject, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TextareaModule} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';
import {MultiSelectModule} from 'primeng/multiselect';
import {Chip} from 'primeng/chip';
import {Select} from 'primeng/select';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CoursesService} from '../../courses/courses.service';
import {AccordionModule} from 'primeng/accordion';
import {FieldsetModule} from 'primeng/fieldset';
import {Dialog} from 'primeng/dialog';
import {StepperModule} from 'primeng/stepper';

@Component({
  selector: 'app-course-edit',
  standalone: true,
    imports: [
        CommonModule,
        Card,
        InputTextModule,
        FormsModule,
        TextareaModule,
        InputNumber,
        MultiSelectModule,
        Chip,
        ReactiveFormsModule,
        Select,
        ButtonModule,
        RouterLink,
        AccordionModule,
        FieldsetModule,
        Dialog,
        StepperModule
    ],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit{
    private courseService = inject(CoursesService);
    courseForm!: FormGroup
    loading = false
    categories = [
        {name: 'Development', value: 'development'},
        {name: 'Business', value: 'business'},
        {name: 'Design', value: 'design'},
        {name: 'Marketing', value: 'marketing'},
        {name: 'IT & Software', value: 'it-software'},
        {name: 'Personal Development', value: 'personal-development'},
        {name: 'Music', value: 'music'},
        {name: 'Lifestyle', value: 'lifestyle'},
        {name: 'Photography', value: 'photography'},
        {name: 'Health & Fitness', value: 'health-fitness'},
        {name: 'Language', value: 'language'},
        {name: 'Test Prep', value: 'test-prep'},
        {name: 'Office Productivity', value: 'office-productivity'},
        {name: 'Teacher Training', value: 'teacher-training'},
        {name: 'Academics', value: 'academics'},
        {name: 'Social Science', value: 'social-science'},
    ]

    levels = [
        {name: 'Beginner', value: 'beginner'},
        {name: 'Intermediate', value: 'intermediate'},
        {name: 'Advanced', value: 'advanced'},
    ]

    languages = [
        {name: 'English', value: 'english'},
        {name: 'Spanish', value: 'spanish'},
        {name: 'French', value: 'french'},
        {name: 'German', value: 'german'},
        {name: 'Italian', value: 'italian'},
        {name: 'Portuguese', value: 'portuguese'},
        {name: 'Russian', value: 'russian'},
        {name: 'Dutch', value: 'dutch'},
        {name: 'Japanese', value: 'japanese'},
        {name: 'Chinese', value: 'chinese'},
        {name: 'Arabic', value: 'arabic'},
        {name: 'Turkish', value: 'turkish'},
    ]
    courseImageUrl!: string;
    courseImage!: File;
    courseContent: any[] = [1, 2, 3, 4, 5];
    active = 1
    isLessonDialogVisible = false;

    ngOnInit() {
        this.courseForm = new FormGroup({
            name: new FormControl('', {validators: [Validators.required]}),
            category: new FormControl([], {validators: [Validators.required]}),
            level: new FormControl('', {validators: [Validators.required]}),
            languages: new FormControl([], {validators: [Validators.required]}),
            price: new FormControl<number>(0, {validators: [Validators.required]}),
            thumbnail: new FormControl(null, {validators: [Validators.required]}),
        })
    }

    changeCategories() {
        console.log(this.courseForm.get('category')!.value)
    }

    handleRemoveCategory(value: any) {
        console.log(value)
        this.courseForm.get('category')?.setValue(this.courseForm.get('category')!.value.filter((category: any) => category.value !== value))
        console.log(this.courseForm.get('category')!.value)
    }

    handleCreateCourse() {
        console.log(this.courseForm.value);
        let formData = new FormData();
        formData.append('name', this.courseForm.get('name')!.value);
        formData.append('price', this.courseForm.get('price')!.value);
        formData.append('level', this.courseForm.get('level')!.value);
        formData.append('languages', this.courseForm.get('languages')!.value);
        formData.append('category', this.courseForm.get('category')!.value);
        formData.append('thumbnail', this.courseImage);
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        this.courseService.createCourse(formData);
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.courseImageUrl = URL.createObjectURL(input.files[0]);
            this.courseImage = input.files[0];
            console.log(this.courseImage)
        }
    }

    toggleCreateLessonDialog() {
        this.isLessonDialogVisible = !this.isLessonDialogVisible;
    }
}
