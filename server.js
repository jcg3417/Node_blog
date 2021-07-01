const express = require('express'); // Express를 사용한다
const app = express();
const port = 3000;

const connect = require('./schemas/server'); // Schema를 사용한다
connect();

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public')); // Express 기본제공 static middleware >> 살려놔야됨

const postRouter = require("./routers/posting"); // router 생성 >> post.js
app.use('/api', [postRouter]); // api 호출 및 데이터 리턴하기

app.set('views', __dirname + '/views'); // view 엔진 추가를 위한 코드
app.set('view engine', 'ejs'); // ejs 사용한다 >> 요즘은 프론트 백 나누는 추세라 사용안한다

// 1. 전체 게시글 목록 조회 페이지 >> ListAllPost.js
//     - 제목, 작성자명, 작성 날짜를 조회하기 v
//     - 작성 날짜 기준으로 내림차순 정렬하기 v
//     - 특정 게시글을 클릭할 경우 `게시글 조회 페이지`로 이동하기 v

app.get('/', (req, res) => { // 첫화면: 전체 게시글 목록 조회 페이지
    res.render('listAllPost');
})

// 2. 게시글 조회 페이지 >> refPost.js
//     - 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기

app.get('/refPost', (req, res) => { // 게시글 상세조회 페이지
    res.render('refPost')
})

// 3. 게시글 작성 페이지 >> posting.js
//     - 제목, 작성자명, `비밀번호`, 작성 내용을 입력하기
//     - "글쓰기" 버튼을 클릭하면 `전체 게시글 목록 조회 페이지`로 이동하고, 최신 게시글이 최상단에 위치함을 확인하기

app.get('/posting', (req, res) => { // 게시글 작성 페이지
    res.render('posting')
})

// 4. 게시글 수정 페이지 >> edit.js
//     - 작성 페이지와 동일한 폼. 수정하기 버튼을 눌렀던 게시글이 미리 입력되게 하기
//     - 비밀번호란은 비워두기
//     - "글쓰기" 버튼은 없고 "수정 완료", "삭제하기" 버튼만 만들기
//     - "수정완료" 버튼을 누를 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
//     - "삭제하기" 버튼을 누를 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기

app.get('/edit', (req, res) => { // 게시글 수정 페이지
    res.render('edit')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})