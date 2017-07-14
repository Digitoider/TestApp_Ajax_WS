export default class Validator{
  constructor(text){
    this.text = text.trim();
    // this.fields = [];
  }

  hasMoreSymbolsThan(amount){
    if (this.text.length > amount) return true;
    return false;
  }

  isEmpty(){
    if(this.text.length == 0)return true;
    return false;
  }

  isNumber(){
    return this.text.match(/^\d+$/) != null;
  }

  isNotNumber(){
    if(!this.isNumber()) return true;
    return false;
  }

  isLessThan(amount){
    var val = Number(this.text);
    if(isNaN(val) || val > amount-1) return false;
    return true;
  }

  isMoreThan(amount){
    var val = Number(this.text);
    if(isNaN(val) || val <= amount) return false;
    return true;
  }
}
