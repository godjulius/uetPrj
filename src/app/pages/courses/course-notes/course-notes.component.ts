import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
    selector: 'app-course-notes',
    standalone: true,
    imports: [CommonModule, FormsModule, Textarea, ButtonDirective, Ripple],
    templateUrl: './course-notes.component.html',
    styleUrl: './course-notes.component.css'
})
export class CourseNotesComponent {
    @Input() currentTime: number = 0;

    @Output() seekTo = new EventEmitter<number>();
    @Output() pauseVideo = new EventEmitter<void>();
    @Output() resumeVideo = new EventEmitter<void>();

    notes: { time: number, text: string }[] = [];
    editIndex: number | null = null;
    noteText: string = '';

    addNote() {
        if (this.noteText.trim()) {
            if (this.editIndex !== null) {
                // Nếu đang sửa
                this.notes[this.editIndex].text = this.noteText.trim();
                this.editIndex = null;
            } else {
                // Thêm mới
                this.notes.push({time: this.currentTime, text: this.noteText.trim()});
            }

            // Luôn sắp xếp sau khi thêm hoặc sửa
            this.notes.sort((a, b) => a.time - b.time);

            this.noteText = '';
            this.resumeVideo.emit();
        }
    }

    editNote(index: number) {
        this.noteText = this.notes[index].text;
        this.editIndex = index;
        this.pauseVideo.emit();
    }

    deleteNote(index: number) {
        this.notes.splice(index, 1);
    }

    formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${this.padZero(mins)}:${this.padZero(secs)}`;
    }

    padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

    goToNote(time: number) {
        this.seekTo.emit(time); // Phát sự kiện
    }
}
