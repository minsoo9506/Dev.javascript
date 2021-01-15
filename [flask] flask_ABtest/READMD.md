# Flask를 이용한 AB test 구현
- reference : [인프런 가장 빠른 풀스택: 파이썬 백엔드와 웹기술 기본 [풀스택 Part1]](https://www.inflearn.com/course/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%92%80%EC%8A%A4%ED%83%9D-1?utm_source=facebook&utm_medium=cpm&utm_campaign=push-course&utm_content=325804#description)

## 구현내용
-  `flask`를 이용한 AB test 구현 
   -  RestAPI (`http`의 `get,post` 기능사용)
   -  `flask`의 `blueprint` 기능을 통해 MVC 형태구현
   -  `flask-login`을 이용하여 login 기능구현
- 사용자가 해당 url을 들어올 때마다 두 가지의 화면을 보여준다.
  - 이때 `pymongo`를 이용하여 mongoDB에 log 기록을 남긴다.
- 사용자가 구독을 하면 `pymysql`을 이용하여 mysql db에 이름, 이메일, 블로그 종류 3가지 정보를 저장한다.
- 이미 구독을 한 상태면 구독 시 블로그 종류를 계속 보여준다.
- 구독취소를 하면 다시 random하게 블로그 2종류를 보여준다.

## 사용툴
- flask, Mysql, MongoDB

## 실제 사이트 모습
- blog A :    
<img src="blog_A.png" width="300" height="200"> 

- blog B :   
<img src="blog_B.png" width="300" height="200"> 

- 구독한 이후 :   
<img src="blog_image.png" width="300" height="200"> 

