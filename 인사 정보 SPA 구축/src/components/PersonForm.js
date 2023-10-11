export default class PersonForm {
  constructor($target) {
    this.$target = $target;

    this.setState();
  }

  template() {
    const $div = document.createElement("div");
    $div.id = "form_container";
    $div.innerHTML = `        
      <span class="form_elem">
        <input id="name" placeholder="이름">
      </span>
      <span class="form_elem">
        <input id="email" placeholder="이메일">
      </span>
      <span class="form_elem">
        <input id="nickname" placeholder="닉네임">
      </span>
      <span class="form_elem">
        <select id="role" name="role">
          <option value="">직군을 선택해주세요</option>
          <option value="backend">백엔드</option>
          <option value="frontend">프론트엔드</option>
          <option value="fullstack">풀스택</option>
        </select>
      </span>
      <span class="form_elem">
        <select id="mbti" name="mbti">
          <option value="">MBTI를 선택해주세요</option>
          <option value="backend">mbti1</option>
          <option value="frontend">mbti2</option>
          <option value="fullstack">mbti3</option>
        </select>
      </span>
      <span class="form_elem">
        <button type="submit">등록</button>
      </span>`;

    return $div;
  }

      
  render() {
    this.$target.appendChild(this.template());
  }

  setState() {
    this.render();
  }
}