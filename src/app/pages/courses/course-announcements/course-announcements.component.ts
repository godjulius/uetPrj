import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorReadOnlyComponent} from '../../../shared/components/editor-read-only/editor-read-only.component';

@Component({
    selector: 'app-course-announcements',
    standalone: true,
    imports: [CommonModule, EditorReadOnlyComponent],
    templateUrl: './course-announcements.component.html',
    styleUrl: './course-announcements.component.css'
})
export class CourseAnnouncementsComponent {
    announcements = [
        {
            id: 1,
            title: 'Angular Standalone Components: Lazy Loading Made Simple',
            content: {
                "time": 1744474293687,
                "blocks": [
                    {
                        "id": "ZFjv8DHmrc",
                        "type": "paragraph",
                        "data": {
                            "text": "Hi everyone,"
                        }
                    },
                    {
                        "id": "MmCZNYEhZZ",
                        "type": "paragraph",
                        "data": {
                            "text": "This Angular feature can significantly improve both the structure and performance of your applications: Standalone Components."
                        }
                    },
                    {
                        "id": "-Kv7APmg7n",
                        "type": "paragraph",
                        "data": {
                            "text": "If you've been working with traditional NgModule-based components, you might be familiar with the extra steps and boilerplate needed to manage them — especially when it comes to lazy loading. Standalone components simplify this by removing the need for NgModules altogether."
                        }
                    },
                    {
                        "id": "83KMtu5r18",
                        "type": "paragraph",
                        "data": {
                            "text": "Here’s what makes them so useful:"
                        }
                    },
                    {
                        "id": "wY85Wm36RX",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "<b>No NgModule Required</b>&nbsp;– You can declare components without wrapping them in a module. Just add standalone: true to your @Component decorator.",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "X6VE1K4KFV",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "<b>Simplified Lazy Loading:</b>&nbsp;Standalone components let you lazy load individual screens effortlessly using the loadComponent syntax in Angular routing. This makes it easier to optimize performance by reducing the size of your initial application bundle.",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "UPT6CoKQMO",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "<b>Interoperability:</b> You can use standalone components inside NgModule-based applications and vice versa. Migration is smooth and gradual.",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "gwn1DGqkus",
                        "type": "list",
                        "data": {
                            "style": "unordered",
                            "meta": {},
                            "items": [
                                {
                                    "content": "<b>Better Developer Experience:</b>&nbsp;With Angular Language Service, modern IDEs can auto-import dependencies for standalone components, so manual imports aren't a hassle anymore.",
                                    "meta": {},
                                    "items": []
                                }
                            ]
                        }
                    },
                    {
                        "id": "QU7rh5Io-U",
                        "type": "paragraph",
                        "data": {
                            "text": "Here’s a quick example of lazy loading with a standalone component:"
                        }
                    },
                    {
                        "id": "k7q7QupoZ-",
                        "type": "paragraph",
                        "data": {
                            "text": "No need to create a module for each screen anymore!"
                        }
                    },
                    {
                        "id": "Ghm0-aaRb3",
                        "type": "paragraph",
                        "data": {
                            "text": "If you're maintaining or building an Angular app, consider exploring standalone components. They're beginner-friendly, modular, and a big step forward in making Angular development faster and cleaner."
                        }
                    },
                    {
                        "id": "l2zCCTVvpL",
                        "type": "paragraph",
                        "data": {
                            "text": "Cheers, and happy coding!"
                        }
                    },
                    {
                        "id": "hAOgpD3jgt",
                        "type": "paragraph",
                        "data": {
                            "text": "Vasco"
                        }
                    },
                    {
                        "id": "3ybSn_QSDF",
                        "type": "paragraph",
                        "data": {
                            "text": "Angular University"
                        }
                    }
                ],
                "version": "2.31.0-rc.7"
            },
            createdAt: '2024-03-01T08:00:00Z',
            user: {
                id: 101,
                name: 'Admin',
                avatar: 'https://i.pravatar.cc/40?u=admin'
            }
        },
        {
            id: 2,
            title: 'Upgrade Your Angular Code with Signal Inputs 🚀',
            content: {
                "time": 1744474594095,
                "blocks": [
                    {
                        "id": "dbYm91mtmf",
                        "type": "paragraph",
                        "data": {
                            "text": "Hi everyone,"
                        }
                    },
                    {
                        "id": "3d04ye5Qm8",
                        "type": "paragraph",
                        "data": {
                            "text": "If you're used to working with the traditional @Input() decorator and the OnChanges lifecycle hook, Signal Inputs offer a more reactive and streamlined approach."
                        }
                    },
                    {
                        "id": "WN1vlCjpe1",
                        "type": "paragraph",
                        "data": {
                            "text": "Especially valuable when building apps with Signals at their core.<b>From @Input() to input():</b>"
                        }
                    },
                    {
                        "id": "dMxQaUfwJG",
                        "type": "paragraph",
                        "data": {
                            "text": "That’s because the value is now a Signal. This small change unlocks big benefits.<b>Replacing OnChanges with effect()</b>"
                        }
                    },
                    {
                        "id": "l0BhHCaZfY",
                        "type": "paragraph",
                        "data": {
                            "text": "This makes your code cleaner and reactive by design—a perfect match for modern Angular apps."
                        }
                    },
                    {
                        "id": "_9p_rcHwOf",
                        "type": "paragraph",
                        "data": {
                            "text": "Signal Inputs are a great step forward for Angular development, especially if you're using Signals throughout your app."
                        }
                    },
                    {
                        "id": "bHjPSochsl",
                        "type": "paragraph",
                        "data": {
                            "text": "Consider refactoring a component or two and see how it improves your code!"
                        }
                    },
                    {
                        "id": "MYPhQiYHJa",
                        "type": "paragraph",
                        "data": {
                            "text": "Cheers, and happy coding!"
                        }
                    },
                    {
                        "id": "J6_CoSAx4l",
                        "type": "paragraph",
                        "data": {
                            "text": "Vasco"
                        }
                    },
                    {
                        "id": "Dlj9kEbkpk",
                        "type": "paragraph",
                        "data": {
                            "text": "Angular University"
                        }
                    }
                ],
                "version": "2.31.0-rc.7"
            },
            createdAt: '2024-03-10T14:30:00Z',
            user: {
                id: 102,
                name: 'Instructor Jane',
                avatar: 'https://i.pravatar.cc/40?u=jane'
            }
        },
        {
            id: 3,
            title: 'Mastering innerHTML and DomSanitizer in Angular',
            content: {
                "time": 1744475329179,
                "blocks": [
                    {
                        "id": "xgB07CGJ6f",
                        "type": "paragraph",
                        "data": {
                            "text": "Hi everyone,"
                        }
                    },
                    {
                        "id": "kFAWZCaR29",
                        "type": "paragraph",
                        "data": {
                            "text": "When working with Angular, you may encounter situations where you need to dynamically inject HTML into your application."
                        }
                    },
                    {
                        "id": "2AyyKhQekc",
                        "type": "paragraph",
                        "data": {
                            "text": "However, Angular's built-in security mechanisms, designed to prevent cross-site scripting (XSS) attacks, often strip inline styles and other elements when using innerHTML."
                        }
                    },
                    {
                        "id": "UKDX80LK3B",
                        "type": "paragraph",
                        "data": {
                            "text": "So how can we safely inject HTML when needed?"
                        }
                    },
                    {
                        "id": "rsLA7Z258G",
                        "type": "paragraph",
                        "data": {
                            "text": "By leveraging DomSanitizer, we can selectively bypass Angular’s security measures&nbsp;<b>when we are confident the content is safe.</b>"
                        }
                    },
                    {
                        "id": "8NkHWolTS7",
                        "type": "paragraph",
                        "data": {
                            "text": "However, it’s important to use this feature cautiously to avoid potential security vulnerabilities."
                        }
                    },
                    {
                        "id": "2jm3gZgEIh",
                        "type": "paragraph",
                        "data": {
                            "text": "Here’s a simple example using DomSanitizer:"
                        }
                    },
                    {
                        "id": "gqHvuwPlqL",
                        "type": "paragraph",
                        "data": {
                            "text": "import { Component } from \"@angular/core\";"
                        }
                    },
                    {
                        "id": "pvnNecnHtL",
                        "type": "paragraph",
                        "data": {
                            "text": "import { DomSanitizer, SafeHtml } from \"@angular/platform-browser\";"
                        }
                    },
                    {
                        "id": "Eq09Tu0xkm",
                        "type": "paragraph",
                        "data": {
                            "text": "@Component({"
                        }
                    },
                    {
                        "id": "g5LaEnCaCu",
                        "type": "paragraph",
                        "data": {
                            "text": "selector: \"app-unsafe-component\","
                        }
                    },
                    {
                        "id": "JudhfR07PO",
                        "type": "paragraph",
                        "data": {
                            "text": "template: `&lt;div [innerHTML]=\"trustedHtml\"&gt;&lt;/div&gt;`,"
                        }
                    },
                    {
                        "id": "WVRp0g3stZ",
                        "type": "paragraph",
                        "data": {
                            "text": "})"
                        }
                    },
                    {
                        "id": "Mt-woRnDgl",
                        "type": "paragraph",
                        "data": {
                            "text": "export class UnsafeComponent {"
                        }
                    },
                    {
                        "id": "_Lt9DGOvtX",
                        "type": "paragraph",
                        "data": {
                            "text": "trustedHtml: SafeHtml;"
                        }
                    },
                    {
                        "id": "en7sQPsuwj",
                        "type": "paragraph",
                        "data": {
                            "text": "constructor(private sanitizer: DomSanitizer) {"
                        }
                    },
                    {
                        "id": "mQtnIFt7Uo",
                        "type": "paragraph",
                        "data": {
                            "text": "const unsafeHtml = \"&lt;h1 style='color:red'&gt;Hello World!&lt;/h1&gt;\";"
                        }
                    },
                    {
                        "id": "Jo8pUTU3Kc",
                        "type": "paragraph",
                        "data": {
                            "text": "this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);"
                        }
                    },
                    {
                        "id": "bF1283I7uh",
                        "type": "paragraph",
                        "data": {
                            "text": "}"
                        }
                    },
                    {
                        "id": "m9XVUoZgUi",
                        "type": "paragraph",
                        "data": {
                            "text": "}"
                        }
                    },
                    {
                        "id": "wZXUaZogpc",
                        "type": "paragraph",
                        "data": {
                            "text": "For a more structured approach, creating a SafeHtml pipe allows you to reuse the sanitization logic across your application:"
                        }
                    },
                    {
                        "id": "YL3467f7cU",
                        "type": "paragraph",
                        "data": {
                            "text": "import { Pipe, PipeTransform } from \"@angular/core\";"
                        }
                    },
                    {
                        "id": "f_svbrQ48S",
                        "type": "paragraph",
                        "data": {
                            "text": "import { DomSanitizer } from \"@angular/platform-browser\";"
                        }
                    },
                    {
                        "id": "tvm7kJUrQd",
                        "type": "paragraph",
                        "data": {
                            "text": "@Pipe({ name: \"safeHtml\" })"
                        }
                    },
                    {
                        "id": "nNYGlM-1C_",
                        "type": "paragraph",
                        "data": {
                            "text": "export class SafeHtmlPipe implements PipeTransform {"
                        }
                    },
                    {
                        "id": "Y5Klddgtze",
                        "type": "paragraph",
                        "data": {
                            "text": "constructor(private sanitizer: DomSanitizer) {}"
                        }
                    },
                    {
                        "id": "bRtjFQ3lPm",
                        "type": "paragraph",
                        "data": {
                            "text": "transform(value: string) {"
                        }
                    },
                    {
                        "id": "17yW27r7GR",
                        "type": "paragraph",
                        "data": {
                            "text": "return this.sanitizer.bypassSecurityTrustHtml(value);"
                        }
                    },
                    {
                        "id": "1BXttbZGjS",
                        "type": "paragraph",
                        "data": {
                            "text": "}"
                        }
                    },
                    {
                        "id": "5dabdWgu5I",
                        "type": "paragraph",
                        "data": {
                            "text": "}"
                        }
                    },
                    {
                        "id": "pZ0Ww2ZaXl",
                        "type": "paragraph",
                        "data": {
                            "text": "Using this pipe, you can simply write:"
                        }
                    },
                    {
                        "id": "W6TXaAnU0_",
                        "type": "paragraph",
                        "data": {
                            "text": "&lt;div [innerHTML]=\"htmlContent | safeHtml\"&gt;&lt;/div&gt;"
                        }
                    },
                    {
                        "id": "admKSybjpy",
                        "type": "paragraph",
                        "data": {
                            "text": "While Angular’s security features protect against potential vulnerabilities, there are valid cases, such as rich-text editors, where injecting HTML is necessary. The DomSanitizer and SafeHtml pipe help achieve this safely."
                        }
                    },
                    {
                        "id": "riNAHMrI8g",
                        "type": "paragraph",
                        "data": {
                            "text": "Cheers, and happy coding!"
                        }
                    },
                    {
                        "id": "p5T9XEnuJ4",
                        "type": "paragraph",
                        "data": {
                            "text": "Vasco"
                        }
                    },
                    {
                        "id": "yg5om2zjYh",
                        "type": "paragraph",
                        "data": {
                            "text": "Angular University"
                        }
                    }
                ],
                "version": "2.31.0-rc.7"
            },
            createdAt: '2024-03-15T12:00:00Z',
            user: {
                id: 103,
                name: 'Instructor John',
                avatar: 'https://i.pravatar.cc/40?u=john'
            }
        }
    ];

    onInstructorClick(user: any) {
        // Chưa navigate, chỉ log ra thông tin user
        console.log("Navigate to instructor page for:", user);
    }

}
