import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
declare var GLOBAL: any;
import { Product } from './product.model';

console.log(_.shuffle([1, 2, 3]));
console.log(GLOBAL);

const products = [
  { title: '누가 내 머리에 똥쌌어', price: 8900 },
  { title: '해님달님', price: 4900 },
];
// const p1 = new Product('책', 18000);
// const loadedProducts = products.map((item) => {
//   return new Product(item.title, item.price);
// });

const loadedProducts = plainToInstance(Product, products);

for (const prod of loadedProducts) {
  console.log(prod);
}
