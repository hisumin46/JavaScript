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
    this.index = 0;
    this.setState(state);
    this.setEvent();
  }
  template() {
    const $div = document.createElement("div");
    $div.id = "cards_container";
    this.state.cardStatus.map(state => {
      // 8개 까지만 보이기
      if (parseInt(state.idx) >= 8) return;
      // index 설정
      this.index = state.idx;
      
      // addElement
      let $cardDiv;
      this.state.personalInfo.map(person => {
        if (person.idx != this.index) return;
        $cardDiv = this.addElement(this.index, state, person);
      });
      
      // cards_container - card div
      $div.appendChild($cardDiv);
    });
    
    return $div;
  }


  render() {
    this.$target.appendChild(this.template());
  }


  setState(newState) {
    this.state = {...this.state, ...newState};
    
    const storageObject = new storageUtil;
    storageObject.setItem("personalInfo" , this.state.personalInfo);
    storageObject.setItem("cardStatus" , this.state.cardStatus);
    
    if (this.isRender) {
      this.isRender = false;
      this.render();
    };
  }

  setEvent() {
    // 스크롤 이벤트 - IntersectionObserver - 8개부터 해당하는 div 생성
    (() => {
      // target 지정
      let $cardDiv = this.$target.querySelector(".card:last-child"); // 첫 관찰대상
      const $div = this.$target.querySelector("#cards_container");
      /*
        const io = new IntersectionObserver((entries, observer) => {}, options) 
        callback함수는 관찰한 대상이 등록되거나 가시성에 변화가 생기면 콜백 함수를 실행
        io.observe(element) // 관찰할 대상(요소) 등록
      */
      
      // 인터섹션 옵저버를 생성
      const io = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) { // viewport에 target이 보이면
          io.unobserve($cardDiv); // (기존의) 관찰대상 중지 
          this.index++;
          console.log(this.index);
          const cardStatusIdxVal = this.state.cardStatus[this.index];
          const personalInfoIdxVal = this.state.personalInfo[this.index];
          const $newCardDiv = this.addElement(this.index, cardStatusIdxVal, personalInfoIdxVal);
          if (!$newCardDiv) return
          
          // cards_container - card div
          $div.appendChild($newCardDiv);
          io.observe($newCardDiv); // (새로운) 관찰대상 지정
        }
      }, {
        threshold: 0.5 // 타겟이 50% 이상보이면 실행
      });
      io.observe($cardDiv); // io 호출
    })();

    console.log(this.index);
    // 카드 click 이벤트
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
    });
  }


  addElement(idx, cardStatus, person) {
    // card div elemnt
    const $div = document.createElement("div"); 
    $div.setAttribute("idx", `${idx}`);
    $div.classList.add("card");
    if (!cardStatus) return
    cardStatus.status.split(" ").map(stateVal => {
      $div.classList.add(`${stateVal}`);
    });
    
    // set card_plan div element - front
    const $cardDivFront = document.createElement("div");
    $cardDivFront.classList.add("card_plane" ,`card_plane--front`);
    $cardDivFront.textContent = `${person.name}`;
    
    // set card_plan div element - back
    const $cardDivBack = document.createElement("div");
    $cardDivBack.classList.add("card_plane" ,`card_plane--back`);
    $cardDivBack.textContent = `${person.mbti}`;
    
    // set card_plan div element - front/back style
    if(cardStatus.status === "card") $cardDivBack.style.display = "none";
    else $cardDivFront.style.display = "none";
    
    // card div - card_plane cardDivFront / cardDivBack
    $div.appendChild($cardDivFront);
    $div.appendChild($cardDivBack); 
    
    return $div;
  }
}