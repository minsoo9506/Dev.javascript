// 1. declaration
const arr1 = new Array();
const arr2 = [1,2];

// 2.index
const fruits = ['apple','banana'];
console.log(fruits);
console.log(fruits.length); // 2
console.log(fruits[1]); // banana

// 3. Looping
// a. for
for(let i = 0; i < fruits.length ; i++){
    console.log(fruits[i]);
}
// b. for of
for(let fruit of fruits){
    console.log(fruit);
}
// c. forEach
fruits.forEach(function(fruit){
    console.log(fruit);
})

fruits.forEach((fruit) => console.log(fruit));

// 4. add, del, copy
// 맨뒤에 넣고 빼고
fruits.push('kiwi');
fruits.pop();
// 맨앞에 넣고 빼기
fruits.unshift('kiwi');
fruits.shift();
// unshift와 shift는 느리다

// 원하는 위치에 넣기
// 시작 index, 몇 개 지울건지
fruits.splice(1,1);
fruits.splice(0,1,'bae','lemon');
console.log(fruits)

// 두 배열을 더하는 것
const fruitsAdd = ['add'];
const addition = fruits.concat(fruitsAdd);
console.log(addition);

// 5. searching
// find the index
console.log(addition.indexOf('lemon')); // 1

// includes
console.log(fruits.includes('bae')); //true

// lastIndex
// fruits에 똑같은 값이 중복되면
// indexOf하면 맨 처음 index가 나온다
// 마지막 녀석의 index를 찾고 싶으면
fruits.push('bae');
console.log(fruits.indexOf('bae')); // 0
console.log(fruits.lastIndexOf('bae')); // 2