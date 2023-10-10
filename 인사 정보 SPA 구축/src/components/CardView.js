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
    this.isRender = true;
    this.setState(state);
    this.setEvent();
  }
  template() {
    const $div = document.createElement("div");
    $div.id = "cards_container";
    this.state.cardStatus.map(card => {
      const $cardDiv = document.createElement("div");
      
      // set cardDiv class
      $cardDiv.setAttribute("idx", `${card.idx}`);
      card.status.split(" ").map(state => {
        $cardDiv.classList.add(`${state}`);
      });
      
      // set element
      this.state.personalInfo.map(person => {
        if (person.idx != card.idx) return;
        
        // div tag
        const $cardDivFront = document.createElement("div");
        $cardDivFront.classList.add("card_plane" ,`card_plane--front`);
        $cardDivFront.appendChild(document.createTextNode(`${person.name}`));

        const $cardDivBack = document.createElement("div");
        $cardDivBack.classList.add("card_plane" ,`card_plane--back`);
        $cardDivBack.appendChild(document.createTextNode(`${person.mbti}`));
        
        //set style
        if(card.status === "card") {
          $cardDivBack.style.display = "none";
        } else {
          $cardDivFront.style.display = "none";
        }

        $cardDiv.appendChild($cardDivFront);
        $cardDiv.appendChild($cardDivBack);
        
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
    
    if (this.isRender) {
      this.isRender = false;
      this.render()
    };
  }

  setEvent() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.className === "card_plane card_plane--front") {
        // 애니메이션 class 추가 & 카드 앞뒤면 style 설정
        e.target.parentElement.classList.add("is-flipped");
        e.target.style.display = "none"; // 앞
        e.target.nextSibling.style.display = ""; //뒤
        
        // state 변경
        const idx = e.target.parentElement.getAttribute("idx");
        let UpdateCardStatus = this.state.cardStatus;
        UpdateCardStatus[idx].status = "card is-flipped";
        this.setState({"cardStatus": UpdateCardStatus});
      } else if (e.target.className === "card_plane card_plane--back") {
        e.target.parentElement.classList.remove("is-flipped");
        e.target.style.display = "none"; // 뒤
        e.target.previousSibling.style.display = ""; // 앞
        
        const idx = e.target.parentElement.getAttribute("idx");
        let UpdateCardStatus = this.state.cardStatus;
        UpdateCardStatus[idx].status = "card";
        this.setState({"cardStatus": UpdateCardStatus});
      }
    })
  }
}