import Component from '../components/Component';
import { element } from '../utils/element';
import ControlsHTMLElement from './ControlsHTMLElement';
import TagHTMLElement from './TagHTMLElement';


export default class AppView extends Component {

    constructor({
        onAdd, 
        onChange, 
        onToggle,
        onDelete
      }) {
        super('container');

        this.onDelete = onDelete;
        this.controls = new ControlsHTMLElement({
            onAdd, 
            onChange, 
            onToggle,
          })
        this.render();
    }

    get inputValue() {
        return this.controls.input.value
    }

    appendTag = (tagTitle) => {
        this.tagsField.appendChild(new TagHTMLElement(tagTitle, this.onDelete).container);
    }

    updateSymbolCountSpan = (symbolsCount, maxCount) => {
        this.totalSymbolsSpan.innerHTML = `${symbolsCount}/${maxCount}`;
    
        if(symbolsCount > maxCount) {
          this.totalSymbolsSpan.style = 'color: red;';
          this.tagsField.style = 'border: 1px solid red;';
        } else {
          this.totalSymbolsSpan.style = '';
          this.tagsField.style = '';
          this.controls.tooltip.style = 'display: none;';
        }
    }

    showInputTooltip = (tooltipTitle) => {
        this.controls.tooltip.innerHTML = `${tooltipTitle}`;
        this.controls.tooltip.style = 'display: block;';
    }

    hideTooltip = () => {
        this.controls.tooltip.style = 'display: none;';
    }

    clearTagsField = () => {
      this.tagsField.innerHTML = '';
    }

    render = () => {
        this.tagsField = element('div', {
          className: 'tags-field',
        });
    
        this.totalSymbolsSpan = element('span', {
          className: 'amount-of-symbols',
        });
    
        this.amountOfSymbolsContainer = element('div', {
          className: 'amount-container',
        });
    
        this.amountOfSymbolsContainer.appendChild(this.totalSymbolsSpan);
        this.container.append(this.controls.container, this.tagsField, this.amountOfSymbolsContainer);
      }

}