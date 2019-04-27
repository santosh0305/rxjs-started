import { of } from 'rxjs'; 
import { map, tap, take } from 'rxjs/operators';

// Of
const source = of('World').pipe(
  map(x => `Hello ${x}!`)
);
source.subscribe(x => console.log(x));

// Reduce Operator with array
let numbers = [1,2,3];
const result = of(...numbers).pipe(
  map(result => `result : ${result}!`)
);
result.subscribe(x => console.log(x));

// Take : this takes / prints only 1 item in array
// tap : it will give per item details
let assetTypes =[{assetTypedId:1,assetType:'Type1'},{assetTypedId:2,assetType:'Type2'},{assetTypedId:3,assetType:'Type3'},{assetTypedId:4,assetType:'Type4'},{assetTypedId:5,assetType:'Type5'}];
const assets = of(...assetTypes).pipe(
      take(2),
      tap(x => console.log('Tap info',x)),
      map(assets => console.log('Asset Details : ',assets.assetTypedId,assets.assetType))
  );
assets.subscribe(x => console.log('output : ',x));