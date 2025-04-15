import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-course-notes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './course-notes.component.html',
    styleUrl: './course-notes.component.css'
})
export class CourseNotesComponent {
    @Input() currentTime: number = 0;

    @Output() seekTo = new EventEmitter<number>();
    @Output() pauseVideo = new EventEmitter<void>();
    @Output() resumeVideo = new EventEmitter<void>();

    notes: { time: number, text: string }[] = [];
    noteText: string = '';

    addNote() {
        if (this.noteText.trim()) {
            this.notes.push({time: this.currentTime, text: this.noteText.trim()});
            this.noteText = '';
            this.resumeVideo.emit();
        }
    }

    goToNote(time: number) {
        this.seekTo.emit(time); // Phát sự kiện
    }
}
