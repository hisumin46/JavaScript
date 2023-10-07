import storageUtil from "../../utils/storage.js";
import ContentTitle from "../components/ContentTitle.js";
import CardView from "../components/CardView.js"

export default class HomePage {
  constructor($target) {
    this.$target = $target;

    this.render();
  }

  render() {
    // getNewData
    const storageObject = new storageUtil;
    const personalInfo =  storageObject.getItem("personalInfo");
    
    // main tag
    const $main = document.createElement("main");
    $main.setAttribute("id", "page_content");
    
    // contentTitle
    new ContentTitle($main, "CardView");
    // CardView
    new CardView($main, {"personalInfo": personalInfo});

    this.$target.appendChild($main);
  }
}