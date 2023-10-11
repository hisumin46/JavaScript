import ContentTitle from "../components/ContentTitle.js";
import PersonForm from "../components/PersonForm.js";

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
    
    // PersonForm
    new PersonForm($main);

    // $main.innerHTML += `

    // `;
    return $main;
  }

  render() {
    this.$target.appendChild(this.template());
  }
}