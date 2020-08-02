- 자바스크립트 데이터 타입
  - 기본타입
    - 숫자, 문자열, 불린값, null, undefined
  - 참조타입
    - 객체, 배열, 함수, 정규표현식

# 3.1 자바스크립트 기본 타입
- `var` 로 모든 변수 선언
- `typeof` 연산자 : 피연산자의 타입을 리턴

## 3.1.1 숫자
- 하나의 숫자형만 존재
  - 모든 숫자를 64비트 부동 소수점 형태로 저장
  - 따라서 정수, 실수 구분 x
  - 나머지 계산이 소수점까지 나온다

## 3.1.2 문자열
- 큰, 작은 따옴표로 생성
- 한 번 정의된 문자열은 수정이 불가 (읽기만 가능)

## 3.1.3 불린값
- `true, false` 
  
## 3.1.4 null과 nudefined
- 두 데이터 타입 모두 '값이 비어있음'을 나타낸다
- undefined
  - 기본적으로 값이 할당되지 않은 변수
  - 변수 자체의 값 또한 undefined
  - 즉, undefined는 타입이자 값을 나타낸다
- null
  - 개발자가 명시적으로 값이 비어있음을 나타내는데 사용
  - null 타입 변수를 `typeof` 로 보면 object 라고 나온다.
  
# 3.2 자바스크립트 참조 타입 (객체 타입)
- JS에서 기본 타입을 제외한 모든 값은 객체
- JS에서 객체
  - '이름 : 값' 형태의 property들을 저장하는 컨테이너
  - 자료구조 Hash와 유사
  - 여러 개의 property들을 포함할 수 있다
    - property들은 기본타입의 값을 포함하거나 다른 객체를 가르킬 수 있다
  - property는 함수로 포함할 수 있으며 이러한 property를 메서드 라고 한다

## 3.2.1 객체 생성
- JS의 객체 개념은 c++, java와 같이 클래스를 정의하고 인스턴스를 생성하는 과정과 다르다
- 클래스라는 개념이 없고 객체 리터럴이나 생성자 함수 등 별도의 생성 방식이 존재
- JS에서 객체 생성 방법
  - 기본 제공 `Object()` 객체 생성자 함수
  - 객체 리터럴
  - 생성자 함수

### 3.2.1.1 `Object()` 생성자 함수 이용

```javascript
var foo = new Object();
foo.name = 'foo';
foo.age = 26;
console.log(typeof foo); // object
console.log(foo); // {name:'foo', age:30}
```

### 3.2.1.2 객체 리터럴 방식 이용
- 중괄호를 이용하여 객체 생성
- property이름은 문자열이나 숫자
- 값은 JS의 값 어떤 것도 가능
  - 함수일 경우 메서드 라고 부름

```javascript
var foo = {
    name : 'song';
    age : 30;
}
```

### 3.2.1.3 생성자 함수 이용
- 함수를 통해 객체 생성
  - 이렇게 객체를 생성하는 함수를 생성자 함수
  - 이는 4장에서 자세히 공부

## 3.2.2 객체 프로퍼티 읽기/쓰기/갱신
- 객체는 새로운 값을 가진 프로퍼티를 생성하고
- 생성된 프로퍼티에 접근하여 해당 값을 읽거나 원하는 값으로 프로퍼티의 값을 갱신 가능
- 프로퍼티 접근 방법
  - 대괄호 표기법
  - 마침표 표기법

```javascript
var foo = {
    name : 'song',
    age : 30
};
    // 읽기 
console.log(foo['name']) // song
console.log(foo.name) // song
console.log(foo.nickname) // undefined
    // 갱신
foo.name = 'kim';
console.log(foo['name']) // kim
    // 동적 생성
foo.weight = 70;
console.log(foo['weight'])
```

## 3.2.3 for in 문, 객체 프로퍼티 출력

```javascript
var foo = {
    name : 'song',
    age : 30
};

var prop;
for (prop in foo) {
    console.log(prop, foo[prop])
}
```

## 3.2.4 객체 프로퍼티 삭제
- `delete` 연산자를 통해 프로퍼티 삭제
  - 단, 객체 자체를 삭제하는 것은 불가

```javascript
var foo = {
    name : 'song',
    age : 30
};

delete foo['name'];
console.log(foo['name']) // undefined
```

# 3.3 참조 타입의 특성
# 3.4 프로토 타입
# 3.5 배열
# 3.6 기본 타입과 표준 메서드
# 3.7 연산자