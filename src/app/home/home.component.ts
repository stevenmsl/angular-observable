import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  private sub: Subscription;

  ngOnInit() {
    const custObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        // observable will stop emitting values
        // and it will not complete after emitting
        // an error
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    const opsApplied = custObservable.pipe(
      filter((data) => data > 0),
      map((data) => {
        return `Round ${data}`;
      })
    );

    this.sub = opsApplied.subscribe(
      (count) => {
        console.log(count);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        console.log('completed!');
      }
    );
  }

  /*
  ngOnInit() {
    // it will keep emitting values even if
    // you navigate away from the home component
    // unless you unsubscribe from the observable
    // upon destruction of the component
    this.sub = interval(1000).subscribe((count) => {
      console.log(count);
    });
  }
  */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
