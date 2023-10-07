/*
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
*/

export default class CardView {
  constructor($target, state) {
    this.$target = $target;
    this.setState(state);
  }
  template() {
    const $div = document.createElement("div");
    $div.id = "cards_container";
    $div.innerHTML = `
    ${this.state.personalInfo.map(person => `
    <div idx="${person.idx}" class="card">
        <div class="card_plane card_plane--front">${person.name}</div>
        <div class="card_plane card_plane--back">${person.mbti}</div>
      </div>
      `).join("")}
    `;
    
    return $div;
  }

  render() {
    this.$target.appendChild(this.template());
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }
}