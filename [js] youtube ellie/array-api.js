// 배열을 string으로 변환 
const fruits = ['apple', 'banana'];
const result = fruits.join('/');
console.log(result);

// 주어진 string을 배열로
const fruits2 = 'apple, banana';
const result2 = fruits2.split(',');
console.log(result2);

// 주어진 배열을 거꾸로
const arr = [1,2,3];
const result3 = arr.reverse();
console.log(arr); // 주의 : arr도 거꾸로 바뀐다 ㄷㄷ
console.log(result3);

// 배열의 일부만 선택
const arr2 = [1,2,3,4];
const result4 = arr2.splice(0,2);
console.log(arr2); // [3,4]
console.log(result4); // [1,2]

const arr3 = [1,2,3,4];
const result5 = arr3.slice(0,2);
console.log(result5); // [1,2]
console.log(arr3); // [1,2,3,4]

//
class Student {
    constructor (name, age, enrolled, score){
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}

const Students = [
    new Student('A', 29, true, 45),
    new Student('B', 30, false, 80),
    new Student('C', 27, true, 48),
    new Student('D', 16, true, 70)
];

// score가 80인 사람 찾기
// find : 콜백함수 필요
// true가 나오면 해당하는 배열의 원소 바로 return하고 끝
{
const result = Students.find(function(student){
    return student.score === 80;
});
console.log(result);
}

// 수업 true인 사람들
// ture인 모든 원소들 return
{
const result = Students.filter((student)=>student.enrolled);
}

// score값을 담은 배열을 만들고 싶다
{
const result = Students.map((student)=>student.score);
console.log(result);
}

// 점수 50 이하
// some : 배열의 요소 하나라도 조건을 만족하면 true 리턴
// every : 모든 요소들이 만족해야 함
{
    const result = Students.some((student)=>student.score<50);
    console.log(result);
}

// 학생들의 평균 점수
// reduce : 배열의 값들을 뭔가 누적할때
// reduceRight : 배열의 맨 끝부터
{
    const result = Students.reduce((prev, curr)=>{
        console.log(curr.score);
        return prev + curr.score;
    }, 0);
    console.log(result); // score들이 누적되어 더해진 243
}

// 각 점수들을 string으로!
{
    const result = Students
    .map((student)=>student.score)
    .join('');

    console.log(result);
}

// 점수들을 정렬
{
    const result = Students.map(student=>student.score)
    .sort((a,b)=>a-b) // callback함수에 이전값과 현재값이 전달 -> 음수가 return되면 이전값이 더 작다고 정렬
    .join();
    console.log(result); // 45, 48, 70,80
}