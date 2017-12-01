import {addClass,removeClass} from "./helpers.js";

const mouseOverHandler = (e)=>{
  const span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  addClass(span,'tooltip-show');
};
const mouseOutHandler = (e)=>{
  const span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  removeClass(span,'tooltip-show');
};

export default {
  install(Vue){
    //custom directive
    Vue.directive('tooltip',{
      bind(el,bindings){ //one time event
        const span = document.createElement('SPAN');
        const text = document.createTextNode('Seats available: ' + bindings.value.seats);
        span.appendChild(text);
        addClass(span, 'tooltip');
        el.appendChild(span);
        const div = el.getElementsByTagName('DIV')[0];
        div.addEventListener('mouseover', mouseOverHandler);
        div.addEventListener('mouseout', mouseOutHandler);
        div.addEventListener('touchstart', mouseOverHandler);
        div.addEventListener('touchend', mouseOutHandler);
      },
      unbind(el){
        const div = el.getElementsByTagName('DIV')[0];
        div.removeEventListener('mouseover', mouseOverHandler);
        div.removeEventListener('mouseout', mouseOutHandler);
        div.removeEventListener('touchstart', mouseOverHandler);
        div.removeEventListener('touchend', mouseOutHandler);
      }
    });
  }
}
