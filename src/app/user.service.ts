import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  activatedEmitter = new EventEmitter<boolean>();
  // use subject to facilitate cross-component communication
  activatedSubject = new Subject<boolean>();
}
