import {Component, ElementRef, AfterViewInit, ViewChild, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import {Button} from 'primeng/button';
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
    selector: 'app-editor',
    standalone: true,
    imports: [
        Button
    ],
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit, OnDestroy {
    @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
    @Input() isFunctionsVisible = false
    @Input() defaultData: any;
    @Output() onSave = new EventEmitter();
    private editor!: EditorJS;
    isReadOnly = false;
    ngAfterViewInit(): void {
        this.editor = new EditorJS({
            holder: this.editorContainer.nativeElement,
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
            placeholder: 'Nhập nội dung của bạn...',
            autofocus: true,
            onReady: () => {
                this.editor.render(this.defaultData)
            }
        });
    }

    saveContent() {
        this.editor.save().then((outputData) => {
            console.log('Dữ liệu đã lưu:', outputData);
            this.onSave.emit(outputData);
        }).catch((error) => {
            console.log('Lỗi khi lưu dữ liệu:', error);
        });
    }

     getEditorContent() {
        return this.editor.save();
    }

    render(data: any) {
        this.editor.render(data);
    }

    toggleReadOnly() {
        this.isReadOnly = !this.isReadOnly;
        this.editor.readOnly.toggle(); // Chuyển giữa chế độ đọc và chỉnh sửa
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
