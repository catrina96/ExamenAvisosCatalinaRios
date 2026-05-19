import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat', standalone: true })
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const d = new Date(value);
    return new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
  }
}
