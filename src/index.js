import './assets/styles/styles.css';
import TagHTMLElement from './components/TagHTMLElement';
import ControlsHTMLElement from './components/ControlsHTMLElement'

class TagCreationComponent {
  constructor() {
    this.state = {
      a: 1
    }
  }

  renderTag(tagTitle) {
    document.querySelector('.tags-field').appendChild(new TagHTMLElement(tagTitle).render());
  }

  renderControls() {
    return new ControlsHTMLElement().render();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'container';

    this.tagsField = document.createElement('div');
    this.tagsField.className = 'tags-field';

    this.container.appendChild(this.renderControls());
    this.container.appendChild(this.tagsField);


    document.querySelector('main').appendChild(this.container);

  }
}


const xbTagCreator = new TagCreationComponent();

xbTagCreator.init();

document.getElementById('add-tag-button').addEventListener('click', () => xbTagCreator.renderTag('new tag'))

