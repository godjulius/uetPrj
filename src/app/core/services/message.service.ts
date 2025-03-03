import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppMessageService {
    messageService: any;

    constructor() {
    }

    setMessageService(messageService: any) {
        this.messageService = messageService;
    }

    addSuccess(msg: ToastMessage) {
        this.messageService.add({severity: 'success', summary: msg.summary, detail: msg.detail})
    }

    addInfo(msg: ToastMessage) {
        this.messageService.add({severity: 'info', summary: msg.summary, detail: msg.detail})
    }

    addWarn(msg: ToastMessage) {
        this.messageService.add({severity: 'warn', summary: msg.summary, detail: msg.detail})
    }

    addError(msg: ToastMessage) {
        this.messageService.add({severity: 'error', summary: msg.summary, detail: msg.detail})
    }

    addContrast(msg: ToastMessage) {
        this.messageService.add({severity: 'contrast', summary: msg.summary, detail: msg.detail})
    }

    addSecondary(msg: ToastMessage) {
        this.messageService.add({severity: 'secondary', summary: msg.summary, detail: msg.detail})
    }
}

export type messageSeverity = 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary';;
export interface ToastMessage {
    summary: string;
    detail: string;
};
