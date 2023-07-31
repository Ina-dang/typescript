//제네릭 타입 이해
// const names = ['Max', 'manuel'];
const names1: Array<string> = []; // string[]
const names2: Array<string | number> = []; // string | number[]
names1[0].split(' ');

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

promise.then((data) => {
  data.split(' ');
});
