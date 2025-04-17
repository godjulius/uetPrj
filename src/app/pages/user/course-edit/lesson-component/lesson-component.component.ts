import {Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject, DestroyRef} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {StepperModule} from 'primeng/stepper';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {FileProgressEvent, FileSelectEvent, FileUpload, FileUploadHandlerEvent, UploadEvent} from 'primeng/fileupload';
import {CommonModule} from '@angular/common';
import {CoursesService} from '../../../courses/courses.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, Observable, Subscription} from 'rxjs';
import {ProgressBar} from 'primeng/progressbar';
import {HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
    selector: 'app-lesson-component',
    standalone: true,
    imports: [
        CommonModule,
        Dialog, StepperModule,
        FormsModule,
        ButtonModule,
        FileUpload,
        ProgressBar
    ],
    templateUrl: './lesson-component.component.html',
    styleUrl: './lesson-component.component.css'
})
export class LessonComponentComponent implements OnChanges {
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Input() lessonId = '';
    courseService = inject(CoursesService)
    private destroy$ = inject(DestroyRef)
    selectedVideos: File[] | null = null;
    uploadingVideo: File | null = null;
    loading = false;
    uploadProgress = 0;
    uploadSubs!: Subscription;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible']) {
        }
    }


    clearLessonForm() {
        if (this.uploadSubs) {
            // this.uploadSubs.unsubscribe();
        }
        this.visibleChange.emit(false);
    }

    handleUploadVideo(event: FileUploadHandlerEvent) {
        this.selectedVideos = []
        console.log(event)
        this.loading = true;
        this.uploadingVideo = event.files[0];
        console.log(this.uploadingVideo)
        this.uploadSubs = this.courseService.postVideo(this.lessonId, event.files[0])
            .pipe(
                takeUntilDestroyed(this.destroy$),
                finalize(() => {
                    this.loading = false
                    console.log('Upload complete!')
                    this.uploadProgress = 0;
                })
            )
            .subscribe({
                next: (event: HttpEvent<any>) => {
                    if (event.type === HttpEventType.UploadProgress && event.total) {
                        // Calculate percents
                        this.uploadProgress = Math.round(100 * event.loaded / event.total);
                        console.log(`File is ${this.uploadProgress}% uploaded.`);
                    } else if (event.type === HttpEventType.Response) {
                        console.log('Upload complete!', event.body);
                        this.selectedVideos = []
                    }
                },
                error: (err: any) => {
                    console.error('Upload failed.', err);
                }
            });
    }
}
