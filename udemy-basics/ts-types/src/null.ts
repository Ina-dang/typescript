//null 관리하는 여러가지방법 ! ? if

// const button = document.querySelector('button')!;
const button = document.querySelector('button');
const clickHandler = (message: string) => {
  console.log('클릭!' + message);
};
button?.addEventListener('click', clickHandler.bind(null, 'Mimi'));

// if(button){
//   button.addEventListener('click', () => {
//     console.log('클릭!');
//   });
// }

function numbers(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;
}
