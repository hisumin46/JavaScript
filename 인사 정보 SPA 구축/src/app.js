import Header from "./components/Header.js";
import HomePage from "../src/page/HomePage.js";
import SignupPage from "../src/page/SignupPage.js";
import { init } from '../public/routes/router.js'
import { getNewData, getOldData } from "./apis/api.js";
import storageUtil from "../utils/storage.js";

export default class App {
  constructor($tartget) {
    this.$tartget = $tartget;
    this.setData();

    // header
    new Header($tartget);
    
    // content
    this.route = () => {
      const { pathname } = location;
      
      if (pathname === "/") {
        console.log(location);
        location.href = "/web/";
      } else if (pathname === "/web/") {
        // HOME 페이지 랜더링
        new HomePage(this.$tartget);
      } else if (pathname === "/web/signup") {
        console.log(pathname);
        // 인사정보 등록 페이지
        new SignupPage(this.$tartget);
      }
    }
    
    //  ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수 호출
    init(this.route, this.$target);
    this.route();
    window.addEventListener('popstate', this.route);
  }

  setData = async() => {
    let personalInfo = [];
    const newDatae = await getNewData();
    newDatae.map((person, index) => personalInfo.push({...person, ...{"idx":index}}))
    
    const storageObject = new storageUtil;
    storageObject.setItem("personalInfo", personalInfo);
  }
}