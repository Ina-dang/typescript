import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
declare var GLOBAL: any;
import { Product } from './product.model';
import { validate } from 'class-validator';

console.log(_.shuffle([1, 2, 3]));
console.log(GLOBAL);

const products = [
  { title: '누가 내 머리에 똥쌌어', price: -4600 },
  { title: '해님달님', price: 4900 },
];
// const p1 = new Product('책', -18000);
// validate(p1).then((errors) => {
//   if (errors.length > 0) {
//     console.log(errors);
//   } else {
//     console.log(p1.getInformation());
//   }
// });
// const loadedProducts = products.map((item) => {
//   return new Product(item.title, item.price);
// });

const loadedProducts = plainToInstance(Product, products);
for (const prod of loadedProducts) {
  validate(prod).then((errors) => {
    if (errors.length > 0) {
      console.log('VALIDATION ERROR:: ', errors);
    } else {
      console.log(prod.getInformation());
    }
  });
}
