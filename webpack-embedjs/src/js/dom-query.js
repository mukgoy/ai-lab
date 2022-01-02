export default function dom(selector){
  const self = {
    element: document.querySelector(selector),
    html: ()=> self.element,
    on: (event, callback) => {
      self.element.addEventListener(event, callback)
    },
    hide: ()=> {
      self.element.style.display = 'none'
    },
    attr: (name, value) => {
      if(value == null)
        return self.element.getAttribute(name)
      else
        self.element.setAttribute(name, value)
    },
    addClass(className){
        self.element.classList.add(className);
        return self
    },
    removeClass(className){
        self.element.classList.remove(className);
        return self
    },
    toggleClass(className){
        self.element.classList.toggle(className);
        return self
    },
    style(styles){
      for(let key in styles){
        self.element.style[key] = styles[key]
      }
      return self
    }
  }

  return self
}