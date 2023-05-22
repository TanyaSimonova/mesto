export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }

  renderItems() {
    this._renderedItems.forEach(element => {
      this.addItem(element);
    });
  }
}
