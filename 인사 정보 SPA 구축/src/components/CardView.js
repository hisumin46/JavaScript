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
    this.state.cardStatus.map(card => {
      if (parseInt(card.idx) >= 8) return;
      const $cardDiv = document.createElement("div");
      this.index = card.idx;
      
      // set cardDiv class
      $cardDiv.setAttribute("idx", `${this.index}`);
      card.status.split(" ").map(state => {
        $cardDiv.classList.add(`${state}`);
      });
      
      // set element
      this.state.personalInfo.map(person => {
        if (person.idx != this.index) return;
        
        // div tag
        const $cardDivFront = document.createElement("div");
        $cardDivFront.classList.add("card_plane" ,`card_plane--front`);
        $cardDivFront.textContent = `${person.name}`;

        const $cardDivBack = document.createElement("div");
        $cardDivBack.classList.add("card_plane" ,`card_plane--back`);
        $cardDivBack.textContent = `${person.mbti}`;
        
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
    // 무한스크롤 이벤트 - IntersectionObserver - 8개가 넘어가면 관찰대상으로 포함
    /*
      var intersectionObserver = new IntersectionObserver(function(entries) { // 콜백함수로 매개변수 두개 리턴 (entries, observer)
        // enries - 더 보이거나 덜보이게 되면서 통과한 역치를 나타내는 IntersectionObserverEntry 객체배열
        // observer - 자신을 호출한  IntersectionObserver
        
        // If intersectionRatio is 0, the target is out of view
        // and we do not need to do anything.
        if (entries[0].intersectionRatio <= 0) return;
        
        loadItems(10);
        console.log('Loaded new items');
      });
      // start observing
      intersectionObserver.observe(document.querySelector('.scrollerFooter'));
    */

    (() => {
      // target 지정
      // let $cardDiv = this.$target.querySelector(".card:nth-child(8)"); // 첫 관찰대상
      let $cardDiv = this.$target.querySelector(".card:last-child"); // 첫 관찰대상
      // let idx = parseInt($cardDiv.getAttribute("idx"));
      let idx = this.index;
      
      const $div = this.$target.querySelector("#cards_container");
      
      // const io = new IntersectionObserver((entries, observer) => {}, options) 
      // callback함수는 관찰한 대상이 등록되거나 가시성에 변화가 생기면 콜백 함수를 실행
      // io.observe(element) // 관찰할 대상(요소) 등록
      
      // 인터섹션 옵저버를 생성
      const io = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) { // viewport에 target이 보이면
          io.unobserve($cardDiv); // (기존의) 관찰대상 중지 
          const $newDiv = document.createElement("div"); 
          idx++;

          const cardStatusIdxVal = this.state.cardStatus[idx];
          const personalInfoIdxVal = this.state.personalInfo[idx];

          // card div elemnt
          $newDiv.setAttribute("idx", `${idx}`);
          $newDiv.classList.add("card");
          if (!cardStatusIdxVal) return
          cardStatusIdxVal.status.split(" ").map(stateVal => {
            $newDiv.classList.add(`${stateVal}`);
          });
          
          // set card_plan div element - front
          const $cardDivFront = document.createElement("div");
          $cardDivFront.classList.add("card_plane" ,`card_plane--front`);
          $cardDivFront.textContent = `${personalInfoIdxVal.name}`;
          // set card_plan div element - back
          const $cardDivBack = document.createElement("div");
          $cardDivBack.classList.add("card_plane" ,`card_plane--back`);
          $cardDivBack.textContent = `${personalInfoIdxVal.mbti}`;
          // set card_plan div element - front/back style
          if(cardStatusIdxVal.status === "card") $cardDivBack.style.display = "none";
          else $cardDivFront.style.display = "none";
          
          // card div - card_plane cardDivFront / cardDivBack
          $newDiv.appendChild($cardDivFront);
          $newDiv.appendChild($cardDivBack); 
          // cards_container - card div
          $div.appendChild($newDiv);
          
          io.observe($newDiv); // (새로운) 관찰대상 지정
        }
      }, {
        threshold: 0.5 // 타겟이 50% 이상보이면 실행
      });
      io.observe($cardDiv);
    })();




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
}