import closeImg from '../assets/images/close.png';


class TagHTMLElement {
  constructor(tagTitle, deleteTagFunc) {
    this.tagTitle = tagTitle;
    this.deleteTagFunc = deleteTagFunc;
  }

  createTag() {
    this.tag = document.createElement('div');
    this.tag.className = 'tag';

    this.tagTitleSpan = document.createElement('span');
    this.tagTitleSpan.innerHTML = `${this.tagTitle}`

    this.img = document.createElement('img');
    this.img.src = closeImg;
    this.img.alt = 'close-icon';
    this.img.onclick =  () => this.deleteTagFunc(this.tagTitle);
    this.tag.appendChild(this.tagTitleSpan);
    this.tag.appendChild(this.img);
  }

  render() {
    this.createTag();
    return this.tag;
  }

}

export default TagHTMLElement;