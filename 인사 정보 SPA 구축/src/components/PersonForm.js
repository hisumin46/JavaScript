import storageUtil from "../../utils/storage.js";

export default class PersonForm {
  constructor($target) {
    this.$target = $target;
    this.idRender = true;
    
    this.setState();
    this.ivalidEvent();
    this.submit();
  }

  template() {
    // add span tag function
    const addSpanTag = (field) => {
      const $span = document.createElement("span");
      $span.classList.add("form_elem");
      if (field) { // label
        let mark = (field.text != "MBTI")?`<span class="mark">(필수*)</span>`:"";
        $span.innerHTML = `
          <span class="label">
            <span>${field.text}</span>${mark}
          </span>
        `; 
      } else { // button
        $span.innerHTML = `
          <span class="label"></span>
          <button type="submit">등록</button>
        `; 
      }
      return $span;
    };
    
    // form_container div tag
    const $div = document.createElement("div");
    $div.id = "form_container";
    
    // form tag
    const $form = document.createElement("form");
    $form.method = "post";
    const fieldMap = this.state.fieldMap;
    
    // input tag
    const inputChild = fieldMap.input;
    inputChild.map(field => {
      const $span = addSpanTag(field);
      const $input = document.createElement("input");
      $input.id = `${field.id}`;
      $input.name = `${field.id}`;
      $input.placeholder = `${field.text}`;
      $input.setAttribute("required", "");
      $span.appendChild($input);
      
      $form.appendChild($span); // append form
    });
    
    // select tag
    const selectChild = fieldMap.select;
    selectChild.map(field => {
      const $span = addSpanTag(field);
      const $select = document.createElement("select");
      $select.id = $select.name = `${field.id}`;
      // select option
      const optionList = (field.id==="job")? this.state.jobList : this.state.mbtiList;
      $select.innerHTML = `
      ${optionList.map((option) => `
        <option value="${option.value}">${option.text}</option>
      `).join("")}`;
      $span.appendChild($select);
      
      $form.appendChild($span); // append form
    });
    
    // button tag
    const $span = addSpanTag();
    $form.appendChild($span);
    
    $div.appendChild($form); // append form
    
    return $div;
  }
  
  
  render() {
    if (this.idRender) {
      this.$target.appendChild(this.template());
      this.idRender = false;
    }
  }
  
  ivalidEvent() {
    /*
    // input name
      -  2~4 글자의 한글만 입력이 가능합니다.
      - [-]은 선택할 수 있는 문자의 범위를 지정할수있음
      - [ ]뒤에 * 을 붙이면 글자수제한 없는것 / {}중괄호는 글자의 수를 제한해줌
      - ㄱ-ㅎ 뒤에 한번 띄어쓰면 띄어쓰기도 가능하다는 뜻
      - ㄱ-ㅎ 모든 자음 / ㅏ-ㅣ 모든 모음
      - [ㄱ-ㅎㅏ-ㅣ가-힣]{2,4} : 띄어쓰기 안됨, 자음모음 가능, 2~4글자 한글만 가능
    // input email
      - 이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능하며, @grepp.co 형식의 이메일만 입력이 가능합니다.
      - 대소문자 구문 없으며 숫자 입력 가능
      - @grepp.co만 가능
      - [a-zA-Z0-9]*[@]grepp.co : 띄어쓰기 안됨, 대소문자 영문, 숫자만 가능,  @grepp.co 형식
    // input nickanme
      - 대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다.
      - [a-zA-Z]{3,10}
    */
    const inputValidStcate = this.state.fieldMap.input;
    inputValidStcate.map(input => {
      this.$target.querySelector(`#${input.id}`).pattern = `${input.pattern}`;
      this.$target.querySelector(`#${input.id}`).title = `${input.title}`;
    });
  }
  
  
  setState(newState) {
    const storageObject = new storageUtil;
    // component를 그리기 위한 state setting
    const fieldMap = {
      "input": [{"text": "이름", "id" :"name", "pattern": "[ㄱ-ㅎㅏ-ㅣ가-힣]{2,4}", "title": "2~4 글자의 한글만 입력이 가능합니다."}, 
      {"text": "이메일", "id" :"email", "pattern": "[a-zA-Z0-9]*[@]grepp.co", "title": "이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능하며, @grepp.co 형식의 이메일만 입력이 가능합니다."}, 
      {"text": "닉네임", "id" :"nickname", "pattern": "[a-zA-Z]{3,10}", "title": "대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다."}], 
      "select": [{"text": "직군", "id" :"job"}, 
      {"text": "MBTI", "id": "mbti"}]};
    const jobList = [{"text": "직군을 선택해주세요", "value": ""}, {"text": "백엔드", "value": "backend"}, {"text": "프론트엔드", "value": "frontend"}, {"text": "풀스택", "value": "fullstack"}];
    const mbtiList = [{"text":"MBTI를 선택해주세요", "value": ""}, {"text":"ENFJ", "value":"ENFJ"}, {"text":"ENTJ", "value":"ENTJ"}, {"text":"ENFP", "value":"ENFP"}, {"text":"ENTP", "value":"ENTP"}, {"text":"ESFJ", "value":"ESFJ"}, {"text":"ESTJ", "value":"ESTJ"}, {"text":"ESFP", "value":"ESFP"}, {"text":"ESTP", "value":"ESTP"}, {"text":"INFJ", "value":"INFJ"}, {"text":"INTJ", "value":"INTJ"}, {"text":"INFP", "value":"INFP"}, {"text":"INTP", "value":"INTP"}, {"text":"ISFJ", "value":"ISFJ"}, {"text":"ISTP", "value":"ISTP"}];
    this.state = {...this.state, ...{ "fieldMap": fieldMap }, ...{ "jobList": jobList }, ...{ "mbtiList": mbtiList }};
    
    // 새로운 state가 있을 경우
    if (newState) {
      this.state.personalInfo.push(newState);
      this.state.cardStatus.push({"idx": newState.idx, "status": "card"});
      storageObject.setItem("personalInfo", this.state.personalInfo);
      storageObject.setItem("cardStatus", this.state.cardStatus);
    }

    // person/card state setting
    const personalInfo = storageObject.getItem("personalInfo");
    const cardStatus = storageObject.getItem("cardStatus");
    this.state = {...this.state, ...{"personalInfo": personalInfo}, ...{"cardStatus": cardStatus}};

    this.render();
  }
  
  
  submit() {
    this.$target.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const nickname = formData.get("nickname");
      let newPerson = {};
      const personalInfo = this.state.personalInfo;
      
      // this.state.personalInfo.map(person => {
      //   if (email === person.email || nickname === person.nickname) {
      //     alert("이메일 혹은 닉네임이 이미 등록되어 있습니다.");
      //     return false; 
      //     // forEach(), map()은 break로 멈출 수 없음
      //     // 멈추고싶다면 try catch 로 멈추기 하지만 차라리 for문을 쓰는것이 낫다
      //   }
      // });

      for (let i = 0; i < personalInfo.length; i++) {
        const person = personalInfo[i];
        if (email === person.email || nickname === person.nickname) {
          alert("이메일 혹은 닉네임이 이미 등록되어 있습니다.");
          return false;
        }
      }
      for (let [key, value] of formData) {
        /*
        객체에 요소 추가방법
        - dot notation -> 숫자시작 불가 변수포함 불가
        - obj.key = "value"
        - obj["key"] = "value"
        - bracket notation -> key가 변수일때 사용, 숫자 변수 공백 가능
        let key = "key test"  
        obj[key] = "value";			
        */
        newPerson[key] = value;
      }
      newPerson["idx"] = personalInfo.length;
      this.setState(newPerson);
      
      alert("성공적으로 등록되었습니다.");
      e.target.reset(); // form input data reset
    });
  }
}
