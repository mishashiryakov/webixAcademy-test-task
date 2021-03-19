import './assets/styles/styles.css';
import TagHTMLElement from './components/TagHTMLElement';
import ControlsHTMLElement from './components/ControlsHTMLElement'

const MAX_NUMBER_OF_SYMBOLS = 100; //заменить
class TagCreationComponent {
  constructor() {
    this.inputValue = '';
    this.tagsArray = [];
    this.numberOfSymbolsInTagsArray = 0;
    this.maxNumberOfSymbols = 100;
    this.readonlyMode = false;
  }

  get tags() {
    return this.tagsArray;
  }

  inputOnchangeHandler() {
    this.inputValue = document.getElementById('input-tag-title').value;
  }  

  calcAmountOfSymbolsInTagsArray() {
    this.numberOfSymbolsInTagsArray = this.tagsArray.join('').length;
    this.amountOfSymbolsSpan.innerHTML = `${this.numberOfSymbolsInTagsArray}/${this.maxNumberOfSymbols}`;

    if(this.numberOfSymbolsInTagsArray > this.maxNumberOfSymbols) {
      this.amountOfSymbolsSpan.style = 'color: red;';
      this.tagsField.style = 'border: 1px solid red;';
    } else {
      this.amountOfSymbolsSpan.style = '';
      this.tagsField.style = '';
      document.querySelector('.tooltip').style = 'display: none;';
    }
  }

  showTooltipForInput(tooltipTitle ) {
    document.querySelector('.tooltip').innerHTML = `${tooltipTitle}`;
    document.querySelector('.tooltip').style = 'display: block;';
  }

  toggleReadonlyMode() {
    this.readonlyMode = !this.readonlyMode;
  }

  appendTagIntoTagsField(tagTitle) {
    this.tagsField.appendChild(new TagHTMLElement(tagTitle, this.deleteTag.bind(this)).render());
  }

  deleteTag(deletedTagTitle) {
    if (this.readonlyMode) { 
      this.showTooltipForInput('Readonly mode is active!');
      return;
    }

    this.tagsArray = this.tagsArray.filter((tagTitle) => tagTitle !== deletedTagTitle);
    this.tagsField.innerHTML = '';
    this.tagsArray.map(tagTitle => {
      this.appendTagIntoTagsField(tagTitle);
    })
    this.calcAmountOfSymbolsInTagsArray();
  }

  addTag() {
    
    document.querySelector('.tooltip').style = 'display: none;';

    if (this.readonlyMode) { 
      this.showTooltipForInput('Readonly mode is active!');
      return;
    }

    if  (this.numberOfSymbolsInTagsArray > this.maxNumberOfSymbols) {
      this.showTooltipForInput('Exceeded the number of characters');
      return;
    }

    if (this.inputValue.length === 0) { 
      this.showTooltipForInput('Input field is empty');
      return ;
    }
    
    if (this.tagsArray.includes(this.inputValue.trim())) {
      this.showTooltipForInput('Such tag already exists');
      return;
    }

    this.tagsArray.push(this.inputValue.trim());
    this.appendTagIntoTagsField(this.inputValue.trim());
    this.calcAmountOfSymbolsInTagsArray();
    document.getElementById('input-tag-title').value = '';  
  }

  render() {
    this.container = document.createElement('div');
    this.container.className = 'container';

    this.tagsField = document.createElement('div');
    this.tagsField.className = 'tags-field';

    this.amountOfSymbolsSpan = document.createElement('span');
    this.amountOfSymbolsSpan.className = 'amount-of-symbols';
    
    this.amountOfSymbolsContainer = document.createElement('div');
    this.amountOfSymbolsContainer.className = 'amount-container';
    this.amountOfSymbolsContainer.appendChild(this.amountOfSymbolsSpan);

    this.container.appendChild(new ControlsHTMLElement(this.addTag.bind(this), this.inputOnchangeHandler.bind(this), this.toggleReadonlyMode.bind(this)).render());
    this.container.appendChild(this.tagsField);
    this.container.appendChild(this.amountOfSymbolsContainer);

    document.querySelector('main').appendChild(this.container);
  }

  init() {
    this.render();
    if(JSON.parse(localStorage.getItem('tagsArray'))) {
      this.tagsArray = JSON.parse(localStorage.getItem('tagsArray'));
      this.tagsArray.map(tagTitle => {
        this.appendTagIntoTagsField(tagTitle);
      })
    } else {
      localStorage.setItem('tagsArray', JSON.stringify([]));
    }

    this.calcAmountOfSymbolsInTagsArray();
    

    window.addEventListener('unload', () => localStorage.setItem('tagsArray', JSON.stringify(this.tagsArray)));

    document.addEventListener('keyup', event => {
      if (event.code == 'Enter') {
        this.addTag()
      }
    });
  }
}


const xbTagCreator = new TagCreationComponent();

xbTagCreator.init();

console.log(xbTagCreator.tagsList)