import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatus'
})
export class RequestStatusPipe implements PipeTransform {

  //const HomeRequestStatusEnum = { "AwaitingForApproval": 1, "Approved": 2, "Rejected": 3 };
  transform(value: number, ...args: unknown[]): unknown {
    if (!value)
      return value;

    switch (value) {
      case 1: return "Awaiting for approval";
      case 2: return "Approved";
      case 3: return "Rejected";
      default: return "Unknown";
    }
  }

}
