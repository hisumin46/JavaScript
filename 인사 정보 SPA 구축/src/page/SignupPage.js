import ContentTitle from "../components/ContentTitle.js";

export default class SignupPage {
  constructor($target) {
    this.$target = $target;

    this.render();
  }


  template() {
    const $main = document.createElement("main");
    $main.setAttribute("id", "page_content");
    
    // contentTitle
    new ContentTitle($main, "Hello, GreatPeoPle!");

    $main.innerHTML += `
      <div id="form_container">
        <span class="form_elem">
          <input id="name" placeholder="이름">
        </span>
        <span class="form_elem">
          <input id="email" placeholder="이메일">
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
          <button type="submit">등록</button>
        </span>
      </div>
    `;
    return $main;
  }

  render() {
    this.$target.appendChild(this.template());
  }
}