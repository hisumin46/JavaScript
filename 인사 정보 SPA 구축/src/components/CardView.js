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

import storageUtil from "../../utils/storage.js";

export default class CardView {
  constructor($target, state) {
    this.$target = $target;
    this.setState(state);
    this.setEvent();
  }
  template() {
    // const $div = document.createElement("div");
    // $div.id = "cards_container";
    // $div.innerHTML = `
    // ${this.state.personalInfo.map(person => `
    // <div idx="${person.idx}" class="card">
    //     <div class="card_plane card_plane--front">${person.name}</div>
    //     <div class="card_plane card_plane--back">${person.mbti}</div>
    //   </div>
    //   `).join("")}
    // `;
    const $div = document.createElement("div");
    $div.id = "cards_container";
    this.state.cardStatus.map(card => {
      const $cardDiv = document.createElement("div");
      $cardDiv.setAttribute("idx", `${card.idx}`);
      console.log(`${card.status.split(" ")}`);
      $cardDiv.classList.add(`${card.status}`);
      this.state.personalInfo.map(person => {
        if (person.idx != card.idx) return;
        // div tag
        const $cardPlaneDiv = document.createElement("div");
        $cardPlaneDiv.classList.add("card_plane" ,`card_plane--${(card.status==="card")?"front":"back"}`);
        // div text 
        const $cardPlaneDivText = document.createTextNode(`${(card.status==="card")?`${person.name}`:`${person.mbti}`}`);
        $cardPlaneDiv.appendChild($cardPlaneDivText);
        
        $cardDiv.appendChild($cardPlaneDiv);
      });
      $div.appendChild($cardDiv);
    })
    return $div;
  }

  render() {
    console.log("render");
    this.$target.appendChild(this.template());
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    const storageObject = new storageUtil;
    storageObject.setItem("personalInfo" , this.state.personalInfo);
    storageObject.setItem("cardStatus" , this.state.cardStatus);
    this.render();
  }

  setEvent() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.className === "card_plane card_plane--front") {
        // state 를 변경해서 다시 그림
        e.target.parentElement.classList.add("is-flipped");
        const idx = e.target.parentElement.getAttribute("idx");
        let UpdateCardStatus = this.state.cardStatus;
        UpdateCardStatus[idx].status = "card is-flipped";
        this.setState({"cardStatus": UpdateCardStatus});


      } else if (e.target.className === "card_plane card_plane--back") {
        e.target.parentElement.classList.remove("is-flipped");
        // e.target.style.display = "none";
      }
    })
  }
}