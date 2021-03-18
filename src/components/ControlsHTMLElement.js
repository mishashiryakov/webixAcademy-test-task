class ControlsHTMLElement {

  createInput() {
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.id = 'input-tag-title';
    this.label = document.createElement('label');
    this.label.innerHTML = 'Enter a tag';
    this.label.appendChild(this.input);
    return this.label;
  }

  createAddButton() {
    this.button = document.createElement('button');
    this.button.id = 'add-tag-button';
    this.button.innerHTML = 'Add tag';
    return this.button;
  }

  render() {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'controls';
    this.controlsContainer.appendChild(this.createInput());
    this.controlsContainer.appendChild(this.createAddButton());

    return this.controlsContainer;
  }

  showValue() {
    console.log('value')
  }
}

export default ControlsHTMLElement;