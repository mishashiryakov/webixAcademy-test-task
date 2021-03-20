import './assets/styles/styles.css';
import AppView from './components/AppView'
import TagList, { OPERATION_STATUSES } from './components/TagList';

const MAX_NUMBER_OF_SYMBOLS = 100;

class TagCreationComponent {
  constructor() {
    this.tagList = new TagList({useLocalStore: true, maxSymbolsCount: MAX_NUMBER_OF_SYMBOLS});
    this.view = new AppView({
      onAdd: this.addTag, 
      onToggle: this.tagList.toggleReadonlyMode,
      onDelete: this.deleteTag,
    })
  }

  deleteTag = (tag) => {
    const status = this.tagList.delete(tag);

    switch (status) {
      case OPERATION_STATUSES.READ_ONLY:
        this.view.showInputTooltip('Readonly mode is active!');
        break;
    
      case OPERATION_STATUSES.SUCCESS:
        this.view.clearTagsField();
        this.tagList.tags.map(this.view.appendTag);
        this.view.updateSymbolCountSpan(this.tagList.totalSymbols, MAX_NUMBER_OF_SYMBOLS);
        break;
    }
  }

  addTag = () => {
    const tag = this.view.inputValue.trim();
    const status = this.tagList.add(tag);
    
    this.view.hideTooltip();

    switch (status) {
      case OPERATION_STATUSES.READ_ONLY:
        this.view.showInputTooltip('Readonly mode is active!');
        break;

      case OPERATION_STATUSES.MAX_LENGTH:
        this.view.showInputTooltip('Exceeded the number of characters');
        break;

      case OPERATION_STATUSES.EMPTY_TAG:
        this.view.showInputTooltip('Input field is empty!');
        break;

      case OPERATION_STATUSES.ALREADY_EXISTS:
        this.view.showInputTooltip('Such tag already exists!');
        this.view.controls.clearInput();
        break;
       
      case OPERATION_STATUSES.NEW_TAG_LIST:
        this.view.clearTagsField();
        this.tagList.tags.forEach(this.view.appendTag);
        this.view.controls.clearInput();
        break;
    
      case OPERATION_STATUSES.SUCCESS:
        this.view.appendTag(tag);
        this.view.updateSymbolCountSpan(this.tagList.totalSymbols, MAX_NUMBER_OF_SYMBOLS);
        this.view.controls.clearInput();  
        break;
    }
  }

  init = () => {
    document.querySelector('main').appendChild(this.view.container);

    this.tagList.tags.forEach(this.view.appendTag);

    this.view.updateSymbolCountSpan(this.tagList.totalSymbols, MAX_NUMBER_OF_SYMBOLS);

    window.addEventListener('unload', this.tagList.updateLocalStore);

    document.addEventListener('keyup', event => {
      if (event.code == 'Enter') {
        this.addTag();
      }
    });
  }
}

const xbTagCreator = new TagCreationComponent();

xbTagCreator.init();