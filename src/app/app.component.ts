import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  userActivated2 = false;
  private activatedSub: Subscription;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.activatedEmitter.subscribe(
      (activated) => (this.userActivated = activated)
    );
    this.activatedSub = this.userService.activatedSubject.subscribe(
      (activated) => (this.userActivated2 = activated)
    );
  }
  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
}
