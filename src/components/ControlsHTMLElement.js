import Component from './Component';
import { element } from '../utils/element';

class ControlsHTMLElement extends Component {

  constructor({
    onAdd, 
    onToggle
  }) {
    super('controls');
    this.onAdd = onAdd;
    this.onToggle = onToggle;
    this.render();
  }

  createInput = () => {
    this.input = element('input', {
      type: 'text',
      id: 'input-tag-title',
    });

    this.tooltip = element('span', {
      type: 'text',
      className: 'tooltip'
    });

    this.inputContainer = element('div', {
      type: 'text',
      className: 'input-container'
    });

    this.inputContainer.appendChild(this.input);
    this.inputContainer.appendChild(this.tooltip);
  }

  createAddButton = () => {
    this.button = element('button', {
      id: 'add-tag-button',
      innerHTML: 'Add tag',
      onclick: this.onAdd,
    });
  }

  createCheckbox = () => {
    this.checkboxContainer = element('div', {
      className: 'readonly-container',
    });

    this.checkbox = element('input', {
      type: 'checkbox',
      id: 'readonly-checkbox',
      onclick: this.onToggle,
    });

    this.checkboxLabel = element('label', {
      for: this.checkbox.id,
      innerHTML: 'Readonly mode',
    });

    this.checkboxContainer.appendChild(this.checkbox);
    this.checkboxContainer.appendChild(this.checkboxLabel);
  }

  clearInput = () => {
    this.input.value = '';
  }

  render = () => {
    this.createInput();
    this.createCheckbox();
    this.createAddButton();

    this.container.append(this.inputContainer, this.checkboxContainer, this.button);
  }
}

export default ControlsHTMLElement;