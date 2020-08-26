# 7.1 함수형 프로그래밍의 개념
- 함수의 조합으로 작업을 수행
- 함수가 연산의 대상
- 아래의 예시를 통해 이해해보자

```javascript
// 문자열을 암호화하는 함수
f1 = encrypt1;
f2 = encrypt2;

// 암호화할 문자열
pure_val = 'minsoo';

//get_encrypted : 암호화 함수를 받는 함수
encrypted_val1 = get_encrypted(f1);
encrypted_val2 = get_encrypted(f2);
```
- `pure_val`는 작업이 수행되는 동안 변하지 않는다.
- `f1,f2` 같이 외부(여기서는 `minsoo`)에 영향을 미치지 않는 함수 : 순수 함수 pure function
- `get_encrypted`는 함수를 인자로 받아서 값, 함수로 output : 고계 함수 higher-order function
  
# 7.2 자바스크립트에서의 함수형 프로그래밍
- JS에서 함수형 프로그래밍이 가능한 이유
  - 일급 객체로서의 함수
  - 클로저
- 아래처럼 함수가 일급 객체로 취급되서
  - 함수의 인자로 함수를 넘기고
  - 결과로 함수를 반환할 수도 있다
- `str`값이 영향을 받지 않게 하려고 클로저를 사용

```javascript
// psuedo code

var f1 = function(input){
    var result;
    // 암호화 작업 수행
    result = 1;
    return result;
};

var f2 = function(input){
    var result;
    // 암호화 작업 수행
    result = 2;
    return result;
};

var getEncrypted = function(func){
    var str = 'minsoo';
    return function(){
        return func.call(null, str);
    };
};

var encrypted_val1 = getEncrypted(f1)();
console.log(encrypted_val1); // 1

var encrypted_val2 = getEncrypted(f2)();
console.log(encrypted_val2); // 2
```

## 7.2.1 배열의 각 원소 총합 구하기
- 코드의 간결화, 모듈화
```javascript
function reduce(func, arr, memo){
    var len = arr.length,
        i = 0,
        accum = memo;

    for(; i<len; i++){
        accum = func(accum, arr[i]);
    }

    return accum;
}

var arr = [1,2,3,4,5];

var sum = function(x, y){
    return x+y;
}
var mul = function(x, y){
    return x*y;
}

console.log(reduce(sum, arr, 0)); // 15
console.log(reduce(mul, arr, 1)); // 120
```

## 7.2.2 팩토리얼
```javascript
var fact = function(){
    var cache = {'0' : 1};
    var func = function(n){
        var result = 0;

        if(typeof(cache[n])=='number'){
            result = cache[n];
        }
        else{
            cache[n] = n * func(n-1);
            result = cache[n];
        }
    return result;
    };
    return func;
}();

console.log(fact(10));
console.log(fact(20));
```

## 7.2.3 피보나치 수열
```javascript
var cacher = function(cache, func){
    var calculate = function(n){
        if (typeof(cache[n])==='number'){
            result = cache[n];
        } else {
            result = function(cache, func);
            cache[n] = result;
        }
        return result;
    }
    return calculate;
};

var fibo = cacher({'0':0, '1':1}, function(func, n){
    return func(n-1) + func(n-2);
});

console.log(fibo(10));
```

# 7.3 자바스크립트에서의 함수형 프로그래밍을 활용한 주요 함수

## 7.3.1 함수 적용
- 4장에서 `Function.prototype.apply` 함수로 함수 호출을 수행
  - 왜 이름이 apply? 함수형 프로그래밍!
- 함수가 단순히 입력을 넣고 출력을 받는 기능을 수행하는 것뿐만 아니라, 인자 혹은 반환 값으로 전달된 함수를 특정 데이터에 적용시키는 개념으로 이해!

### 7.3.2 커링
- 커링 : 특정 함수에서 정의된 인자의 일부를 넣어 고정, 나머지를 인자로 받는 새로운 함수를 만드는 것을 의미

### 7.3.3 binf

### 7.3.4 래퍼

## 7.3.5 반복 함수

### 7.3.5.1 each
- 배열의 각 요소 혹은 객체의 각 프로퍼티를 하나씩 꺼내서 차례대로 특정 함수에 인자로 넣어 실행시키는 역할
```javascript
function each(obj, fn, args){
    if(obj.length == undefined)
        for(var i in obj)
            fn.apply(obj[i], args || [i, obj[i]]);
    else
        for(var i=0; i<obj.length; i++)
            fn.apply(obj[i], args || [i, obj[i]]);
    return obj;
};

var zzoon = {
    name : 'zzoon',
    age : 30,
    sex : 'Male'
};

each(zzoon, function(idx, value){
    console.log(idx + ' : ' + value);
});
```

### 7.3.5.2 map
```javascript
Array.prototype.map = function(callback){
    var obj = this;
    var value, mapped_value;
    var A = new Array(obj.length);

    for(var i = 0; i < obj.length; i++){
        value = obj[i];
        mapped_value = callback.call(null, value);
        A[i] = mapped_value;
    }
    return A;
};

var arr = [1,2,3];
var new_arr = arr.map(function(value){
    return value*value;
});

console.log(new_arr); // [1,4,9]
```

### 7.3.5.3 reduce
```javascript
Array.prototype.reduce = function(callback, memo){
    var obj = this;
    var value, accumulated_value = 0;

    for(var i = 0; i < obj.length ; i++){
        value = obj[i];
        accumulated_value = callback.call(null, accumulated_value, value);
    }
    return accumulated_value;
};

var arr = [1,2,3];

var accumulated_val = arr.reduce(function(a,b){
    return a + b * b;
});

console.log(accumulated_val); // (1*1+2*2+3*3 =) 14
```