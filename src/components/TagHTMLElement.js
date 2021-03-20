import closeImg from '../assets/images/close.png';
import { element } from '../utils/element';
import Component from './Component';

class TagHTMLElement extends Component {
  constructor(tagTitle, deleteTagFunc) {
    super('tag');
    this.tagTitle = tagTitle;
    this.deleteTagFunc = deleteTagFunc;

    this.render();
  }

  render = () => {
    this.tagTitleSpan = element('span', {
      innerHTML: `${this.tagTitle}`,
    });

    this.img = element('img', {
      src: closeImg,
      alt:'close-icon',
      onclick: () => this.deleteTagFunc(this.tagTitle)
    });
    
    this.container.appendChild(this.tagTitleSpan);
    this.container.appendChild(this.img);
  }
}

export default TagHTMLElement;