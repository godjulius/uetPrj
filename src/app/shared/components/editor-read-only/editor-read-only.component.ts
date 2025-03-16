import {
    Component,
    ElementRef,
    AfterViewInit,
    ViewChild,
    OnDestroy,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import EditorJS, {ToolConstructable} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import Quote from '@editorjs/quote';
import EditorjsList from '@editorjs/list';
import CodeTool from '@editorjs/code';
// @ts-ignore
import Marker from '@editorjs/marker';
@Component({
  selector: 'app-editor-read-only',
  standalone: true,
  imports: [],
  templateUrl: './editor-read-only.component.html',
  styleUrl: './editor-read-only.component.css'
})
export class EditorReadOnlyComponent implements AfterViewInit, OnDestroy , OnChanges{
    @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
    @Input() content: any;
    private editor!: EditorJS;
    isReadOnly = false;

    ngOnChanges(changes: SimpleChanges) {
        if (this.content) {
            console.log(this.content);
            this.editor.render(this.content);
        }
    }

    ngAfterViewInit(): void {
        console.log(this.content);
        this.editor = new EditorJS({
            holder: this.editorContainer.nativeElement,
            readOnly: true,
            data: this.content,
            tools: {
                header: Header,
                // list: List,
                list: {
                    class: EditorjsList as unknown as ToolConstructable,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    },
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                        }
                    }
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C',
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+O',
                    config: {
                        quotePlaceholder: 'Enter a quote',
                        captionPlaceholder: 'Quote\'s author',
                    },
                },
                code: CodeTool,
                Marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                }
            },
        });
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
