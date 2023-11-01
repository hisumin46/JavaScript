# 인사 정보 SPA 리뉴얼

## 개요
- 당신은 기존의 인사 정보 페이지를 SPA로 리뉴얼하는 업무를 맡게 되었습니다.
**Vanilla JS만을 이용**하여 아래의 요구사항에 맞게 작업해서 **세 시간 내에** 리뉴얼된 페이지를 게시해주세요.
- '2022 Dev-Matching: 웹 프론트엔드 개발자(하반기)' 기출 문제입니다.
- [프로그래머스 과제](https://school.programmers.co.kr/skill_check_assignments/331)


## 동작 과정
1. index.js  - `body`를 넘겨 `app.js`의 `App` class 호출
    ```js
    // index.js
    new App($body);
    ```
2. `app.js`  - 넘겨받은 body에 `header`와 `content page` 호출 및 getNewData로 personalInfo 데이터 세팅
    ```js
    // app.js
    new Header($tartget);
    new HomePage(this.$tartget); // localhost:3030/web/
    new SignupPage(this.$tartget); // localhost:3030/web/signup
    setData() {
        storageObject.getItem("personalInfo"); // 로컬스토리지에 personalInfo 값이 있음
        getNewData(); // 로컬스토리지에 personalInfo 값이 없음
    };
    ```
    2-1. `apis/api.js`  - `getNewData` 동작 `new_datat.json` 를 가져옴
    ```js
        // api.js
        getNewData = async () => await request("/src/data/new_data.json");
    ```
    2-2. `utils/storage.js` - `localstorage` 접근
    ```js
        // storage.js
        class storageUtil{};
    ```
3. `/components/Header.js` - 헤더 그리기
    ```js
    // Header.js
    render() {
        const $header = document.createElement("header");
    }
    ```
4. `page/HomePage.js` - `personalInfo`를 통해 `cardStatus` 값을 생성하고 HomePage에 `ContentTitle`, `CardView`를 그림
    ```js
    // HomePage.js
    storageObject.getItem("personalInfo"); // app.js에서 만들어서 무조건 로컬스토리지에 값이 있음
    const cardStatus = ~; // 이때 로컬스토리지에 값이 있으면 값을 가져옴
    // Title
    new ContentTitle($main, "CardView");
    // Card
    new CardView($main, {...{"personalInfo": personalInfo}, ...{"cardStatus": cardStatus}});
    ```
    4-1. `components/ContentTitle.js` - 값에 따라 `title`을 그림
    ```js
    // ContentTitle.js
    render() {
        const $div = document.createElement("div");
        $div.classList.add("content_title");
    }
    ```
    4-2. `components/CardView.js` - `personalInfo`를 이용하여 `card`를 그리며 뒤집기 이벤트 및 로컬스토리지 뒤집은 상태 적용
    ```js
    // CardView.js
    render() {
        const $div = document.createElement("div");
        $div.id = "cards_container";
    }
    ```
5. `page/SignuupPage.js` - SignuupPage에 `ContentTitle`, `PersonForm`를 그림
    ```js
        // Title
        new ContentTitle($main, "Hello, GreatPeoPle!");
        
        // Form
        new PersonForm($main);
    ```
    5-1. `components/ContentTitle.js` - 4-1과 같음
    5-2. `components/PersonForm.js` - card를 생성할수 있는 Form을 그림
    ```js
    // ContentTitle.js
    render() {
        const $span = document.createElement("span");
        $span.classList.add("form_elem");
    }
    ```