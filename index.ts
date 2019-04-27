import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';

// Of
const source = of('World').pipe(
  map(x => `Hello ${x}!`)
);
source.subscribe(x => console.log(x));

// Reduce Operator with array
let numbers = [1,2,3];
const number = of(...numbers).pipe(
  map(number => `number : ${number}!`)
);
number.subscribe(x => console.log(x));

// Reduce on Object 
let assetTypes =[{assetTypdId:1,assetType:'Type1'},
                {assetTypdId:2,assetType:'Type2'}];
const assets = of(...assetTypes);
assets.subscribe(x=>console.log(x));
