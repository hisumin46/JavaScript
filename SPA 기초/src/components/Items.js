import Component from "../core/Compoent.js";

export default class Items extends Component {
  setup () {
    this.state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.state; // state.items
    return `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `
  }
}