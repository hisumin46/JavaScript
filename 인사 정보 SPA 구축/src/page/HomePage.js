export default class HomePage {
  constructor($target) {
    this.$target = $target;

    this.render();
  }

  template() {
    const $main = document.createElement("main");
    $main.setAttribute("id", "page_content");
    $main.innerHTML = `
      <div class="content_title">
        <h1> CardView </h1>
      </div>
      <div id="cards_container">
        <div idx="1" class="card">
          <div class="card_plane card_plane--front">Heedo</div>
          <div class="card_plane card_plane--back">ESTJ</div>
        </div>
        <div idx="2" class="card">
          <div class="card_plane card_plane--front">Kevin</div>
          <div class="card_plane card_plane--back">INTJ</div>
        </div>
        <div idx="3" class="card">
          <div class="card_plane card_plane--front">Dalmi</div>
          <div class="card_plane card_plane--back">INFJ</div>
        </div>
      </div>
    `;
    return $main;
  }

  render() {
    this.$target.appendChild(this.template());
  }
}