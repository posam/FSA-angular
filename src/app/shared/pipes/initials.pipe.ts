import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value.split(' ')
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue[0]
      }, '');

    // return value.split(' ').map(value1 => value1[0]).join('');
  }

}
