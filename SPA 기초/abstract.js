class Component {
  target;
  state;

  constructor(target) { // 생성자
      this.target = target;
      this.setup();
      this.render();
  }

  setup() {};
  template() {return '';}
  render() {
    this.target.innerHTML = this.template();
    this.setEvnet();
  }

  setEvnet() {}
  setState (newState) {
    this.state = {...this.state, ...newState};
    this.render();
  }
}

class App extends Component {
  setup () {
    this.state = {items: ["item1", "item2"]};
  }

  template() {
    const {items} = this.state;
    return `
      <ul>
        ${items.map(i => `<li>${i}</li>`).join('')}
      </ul>
      <button>추가</button>
    `;
  }

  setEvnet() {
    this.target.querySelector("button").addEventListener("click", () => {
      const {items} = this.state;
      this.setState({ items: [ ...items, `item${items.length + 1}`]});
    });
  }
}

new App(document.querySelector("#app"));