/*
  <header>
    <div class="header header_left">
      <span class="menu_name" id="menu_home">HOME</span>
    </div>
    <div class="header header_right">
      <span class="menu_name" id="menu_signup">SIGNUP</span>
    </div>
  </header>
*/

export default class Header {
  constructor($target) {
    this.$target = $target;

    this.render();
    this.setEvent();
  }

  render() {
    const $header = document.createElement("header");
    $header.innerHTML =  `
    <div class="header header_left">
      <span class="menu_name" id="menu_home">HOME</span>
    </div>
    <div class="header header_right">
      <span class="menu_name" id="menu_signup">SIGNUP</span>
    </div>
    `;

    this.$target.appendChild($header);
  }

  setEvent() {
    // 좀 더 간단하게 이벤트 줄 방법 생각하기
    this.$target.querySelector(".header_left").addEventListener("click", e => {
      location.href = "/web/";
    });

    this.$target.querySelector(".header_right").addEventListener("click", e => {
      location.href = "/web/signup";
    })
  }
}