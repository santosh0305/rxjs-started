import { of } from 'rxjs'; 
import { 
  map, 
  tap, 
  take, 
  filter, 
  switchMap, 
  debounceTime, 
  distinctUntilChanged, 
  combineLatest,
  mergeMap,
  catchError
} 
from 'rxjs/operators';
import { interval, fromEvent, merge, empty } from 'rxjs';
import {  scan, takeWhile, startWith, mapTo } from 'rxjs/operators';

// Of
const source = of('World').pipe(
  map(x => `Hello ${x}!`)
);
source.subscribe(x => console.log(x));

// Spread Operator with array
let numbers = [1,2,3];combineLatest
const result = of(...numbers).pipe(
  map(result => `result : ${result}!`)
);
result.subscribe(x => console.log(x));

// Take : this takes / prints only 1 item in array
// tap : it will give per item details
let assetTypes =[
                  {assetTypedId:1,assetType:'Type1'},
                  {assetTypedId:2,assetType:'Type2'},
                  {assetTypedId:3,assetType:'Type3'},
                  {assetTypedId:4,assetType:'Type4'},
                  {assetTypedId:5,assetType:'Type5'}];
const assets = of(...assetTypes).pipe(
      take(2),
      tap(x => console.log('Tap info',x)),
      map(assets => console.log('Asset Details : ',assets.assetTypedId,assets.assetType))
  );
assets.subscribe(x => console.log('output : ',x));

// Observable and subscribe 
/*
What is an Observable? An observable represents a stream, or source of data that can arrive over time. observables are cold.

Subscriptions are what set everything in motion. You can think of this like a tap, you have a stream of water ready to be tapped (observable), someone just needs to turn the handle. In the case of observables, that role belongs to the subscriber.

import { fromEvent } from 'rxjs';

// grab button reference
const button = document.getElementById('myButton');

// create an observable of button clicks
const myObservable = fromEvent(button, 'click');

// for now, let's just log the event on each click
const subscription = myObservable.subscribe(event => console.log(event));
Set up an event listener on our button for click events. Call the function we passed to the subscribe method (observer) on each click event. Return a subscription object with an unsubscribe which contains clean up logic, like removing appropriate event listeners

  // instead of a function, we will pass an object with next, error, and complete methods
const subscription = myObservable.subscribe({
  // on successful emissions
  next: event => console.log(event),
  // on errors
  error: error => console.log(error),
  // called once on completion
  complete: () => console.log('complete!')
});

// clean up with unsubscribe
subscription.unsubscribe();
secondSubscription.unsubscribe();
*/

// Using Of and map operators
const dataSource  = of(1,2,3,4,5,6,7,8);
const subscription  = dataSource .pipe(
  map( x => x*2)
).subscribe(val => console.log('Multiple : ',val));

// Using Filter
const filteredEvenNumbers = dataSource.pipe(
  filter( evenNumber => evenNumber%2==0 ),
  take(3)
).subscribe(result => console.log('Filtered Even',result));

// What is Pipe 
/*
  The pipe function is the assembly line from your observable data source through your operators. Just like raw material in a factory goes through a series of stops before it becomes a finished product, source data can pass through a pipe-line of operators where you can manipulate, filter, and transform the data to fit your use case.
*/

// Using switchMap
// observable of values from a text box, pipe chains operators together
const inputValue = of(1,2,4,5,6);
inputValue.pipe(
    debounceTime(2000),        // wait for a 2sec pause
    distinctUntilChanged(),   // if the value is the same, ignore
    // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
    switchMap(searchTerm => this.typeaheadApi)
  )
  // create a subscription
  .subscribe(results => {
    // update the dom
  });
class typeaheadApi {
  search(data : any) {
    return data;
  }
}

/*
Need to filter data from a source? Check out the filtering operators. Trying to track down a bug, or debug the flow of data through your observable stream? There are utility operators that will do the trick

https://www.learnrxjs.io/operators/filtering/
Filtering Operators
In a push based approach, picking and choosing how and when to accept items is important. These operators provide techniques for accepting values from an observable source and dealing with backpressure.

audit
auditTime
debounce
debounceTime :star:
distinctUntilChanged :star:
distinctUntilKeyChanged
filter :star:
find
first
ignoreElements
last
sample
single
skip
skipUntil
skipWhile
take :star:
takeLast
takeUntil :star:
takeWhile
throttle
throttleTime

https://www.learnrxjs.io/operators/utility/
tap / do :star:
delay :star:
delayWhen
dematerialize
finalize / finally
let
repeat
timeInterval
timeout
timeoutWith
toPromise
*/

// CombineLatest
// give me the last emitted value from each source, whenever either source emits
const sourceOne = of(1,2,3,4);
const sourceTwo = of(4,5,6,7,8);
// give me the last emitted value from each source, whenever either source emits
combineLatest(sourceOne, sourceTwo).subscribe(
  ([latestValueFromSourceOne, latestValueFromSourceTwo]) => {
    // perform calculation
  }
);


// Error handling
source
  .pipe(
    mergeMap(value => {
      return makeRequest(value).pipe(
        catchError(handleErrorByReturningObservable)
      );
    })
  )
  .subscribe(value => {
    // take action
  });

// Switch Map
// RxJS v6+


const COUNTDOWN_SECONDS = 10;

// elem refs
const remainingLabel = document.getElementById('remaining');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');

// streams
const interval$ = interval(1000).pipe(mapTo(-1));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

const timer$ = merge(pause$, resume$)
  .pipe(
    startWith(true),
    switchMap(val => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS),
    takeWhile(v => v >= 0)
  )
  .subscribe((val: any) => (remainingLabel.innerHTML = val));
