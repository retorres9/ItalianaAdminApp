import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es-mx'

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(date: Date) {
    moment().locale('es-mx');

    return moment(date).fromNow();
  }

}
