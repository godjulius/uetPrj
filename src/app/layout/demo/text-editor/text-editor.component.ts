import { Component } from '@angular/core';
import {EditorComponent} from '../../../shared/components/editor/editor.component';
import {Card} from 'primeng/card';
import {EditorReadOnlyComponent} from '../../../shared/components/editor-read-only/editor-read-only.component';

@Component({
  selector: 'app-text-editor',
  standalone: true,
    imports: [
        EditorComponent,
        Card,
        EditorReadOnlyComponent
    ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent {
    content: any;

    handleSaveContent(_content: any) {
        this.content = _content
    }
}
