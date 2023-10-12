export default class PersonForm {
  constructor($target) {
    this.$target = $target;

    this.setState();
  }

  template() {
    // add span tag function
    const addSpanTag = (field) => {
      const $span = document.createElement("span");
      $span.classList.add("form_elem");
      if (field) {
        $span.innerHTML = `
          <label>${field.text}</label>
          <span class="mark">(필수*)</span>
        `; 
      } else {
        $span.innerHTML = `
          <button type="submit">등록</button>
        `; 
      }
      return $span;
    };
    
    const $div = document.createElement("div");
    $div.id = "form_container";
    const fieldMap = this.state.fieldMap;
    // input tag
    const inputChild = fieldMap.input;
    inputChild.map(field => {
      const $span = addSpanTag(field);
      const $input = document.createElement("input");
      $input.id = `${field.id}`;
      $input.placeholder = `${field.text}`;
      $span.appendChild($input);
      $div.appendChild($span);
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
        `).join("")}
      `;
      $span.appendChild($select);
      $div.appendChild($span);
    });

    // button
    const $span = addSpanTag();
    $div.appendChild($span);
    return $div;
  }

  
  render() {
    this.$target.appendChild(this.template());
  }

  setState() {
    // component를 그리기 위한 state setting
    const fieldMap = {"input": [{"text": "이름", "id" :"name"}, {"text": "이메일", "id" :"email"}, {"text": "닉네임", "id" :"nickname"}], "select": [{"text": "직군", "id" :"job"}, {"text": "MBTI", "id": "mbti"}]};
    const jobList = [{"text": "직군을 선택해주세요", "value": ""}, {"text": "백엔드", "value": "backend"}, {"text": "프론트엔드", "value": "frontend"}, {"text": "풀스택", "value": "fullstack"}];
    const mbtiList = [{"text":"MBTI를 선택해주세요", "value": ""}, {"text":"ENFJ", "value":"ENFJ"}, {"text":"ENTJ", "value":"ENTJ"}, {"text":"ENFP", "value":"ENFP"}, {"text":"ENTP", "value":"ENTP"}, {"text":"ESFJ", "value":"ESFJ"}, {"text":"ESTJ", "value":"ESTJ"}, {"text":"ESFP", "value":"ESFP"}, {"text":"ESTP", "value":"ESTP"}, {"text":"INFJ", "value":"INFJ"}, {"text":"INTJ", "value":"INTJ"}, {"text":"INFP", "value":"INFP"}, {"text":"INTP", "value":"INTP"}, {"text":"ISFJ", "value":"ISFJ"}, {"text":"ISTP", "value":"ISTP"}];
    this.state = {...this.state, ...{ "fieldMap": fieldMap }, ...{ "jobList": jobList }, ...{ "mbtiList": mbtiList }};
    this.render();
  }

  setVi
}
