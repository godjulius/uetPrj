import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'languageName'
})
export class LanguageNamePipe implements PipeTransform {
    private languageMap: { [key: string]: string } = {
        en: 'English',
        vi: 'Vietnamese',
        fr: 'French',
        es: 'Spanish',
        ja: 'Japanese',
        zh: 'Chinese',
        de: 'German',
        ko: 'Korean',
        ru: 'Russian',
        it: 'Italian'
        // Thêm ngôn ngữ khác nếu cần
    };

    transform(value: string): string {
        return this.languageMap[value] || value;
    }
}
