export default class Component {
  target;
  state;
  constructor (target) { 
    this.target = target;
    this.setup();
    this.render();
  }
  setup () {};
  template () { return ''; }
  render () {
    this.target.innerHTML = this.template();
  }
}