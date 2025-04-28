import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {
    transform(minutes: number): string {
        if (minutes == null) return '';

        if (minutes === 0) return '-';

        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hrs > 0) {
            return `${hrs}h ${mins < 10 ? '0' + mins : mins}m`;
        } else {
            return `${mins}m`;
        }
    }
}
