/**
 * Created by Rick on 2017-11-19.
 */
'use strict';
const EventBus = new Vue();

function checkFilter(category,title,checked){
  if(checked){
    this[category].push(title);
  }else{
    const idx = this[category].indexOf(title);
    if(idx !== -1){
      this[category].splice(idx,1);
    }
  }
}
function setDay(day){
  this.day = day;
}
export {EventBus,checkFilter,setDay};