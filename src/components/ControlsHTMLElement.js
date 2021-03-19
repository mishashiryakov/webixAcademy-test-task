class ControlsHTMLElement {

  constructor(createTag, inputOnchangeHandler, toggleReadonlyMode) {
    this.createTag = createTag;
    this.inputOnchangeHandler = inputOnchangeHandler;
    this.toggleReadonlyMode = toggleReadonlyMode;
  }

  createInput() {
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.id = 'input-tag-title';
    this.input.onchange = this.inputOnchangeHandler;

    this.span = document.createElement('span');
    this.span.className = 'tooltip';
    
    this.inputContainer = document.createElement('div');
    this.inputContainer.className = 'input-container';
    this.inputContainer.appendChild(this.input);
    this.inputContainer.appendChild(this.span);

    return this.inputContainer;
  }

  createAddButton() {
    this.button = document.createElement('button');
    this.button.id = 'add-tag-button';
    this.button.innerHTML = 'Add tag';
    this.button.onclick = this.createTag;
    return this.button;
  }

  createCheckbox() {
    this.checkboxContainer = document.createElement('div');
    this.checkboxContainer.className = 'readonly-container';

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.id = 'readonly-checkbox';
    this.checkbox.onclick = this.toggleReadonlyMode;

    this.checkboxLabel = document.createElement('label');
    this.checkboxLabel.for = this.checkbox.id;
    this.checkboxLabel.innerHTML = 'Readonly mode';

    this.checkboxContainer.appendChild(this.checkbox);
    this.checkboxContainer.appendChild(this.checkboxLabel);
    return this.checkboxContainer;
  }

  render() {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'controls';
    this.controlsContainer.appendChild(this.createInput());
    this.controlsContainer.appendChild(this.createCheckbox());
    this.controlsContainer.appendChild(this.createAddButton());

    return this.controlsContainer;
  }

  showValue() {
    console.log('value')
  }
}

export default ControlsHTMLElement;