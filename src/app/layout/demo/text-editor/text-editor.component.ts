import { Component } from '@angular/core';
import {EditorComponent} from '../../../shared/components/editor/editor.component';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-text-editor',
  standalone: true,
    imports: [
        EditorComponent,
        Card
    ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent {

}
