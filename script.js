class AppForm {
  constructor() {
    this.form = [];
    this.step = 0;
    this.currentGroup = null;

    this.setListeners();
    this.getForm();
    this.refresh();
  }

  refresh = () => {
    this.step++;
    this.displayStep();
    //console.log("step: "+ this.step);
  }

  displayStep = () => {  
    if(this.currentGroup) //If we have a current group, access style and hide it
      this.currentGroup.style.display = 'none';
      //iterate through each group from the object inside form array 
    this.currentGroup = this.form.find(_group => _group.step === this.step).element; 
    this.currentGroup.style.display = 'block';
  }

  getForm = () => {
    //const groups = document.getElementsByClassName('form-group')
    const groups = Array.from(document.getElementsByClassName('form-group'));
    //console.log(groups); //HTMLCollection of all bootstrap forms
    groups.forEach(_group => {
      const children = Array.from(_group.children);
      //console.log(_group);
      this.form.push({
        'step': Number.parseInt(_group.dataset.step),
        'element': _group,
        'input': children.find(_el => _el.nodeName === "INPUT")
      })
      //console.log(this.form);
    })
   
  }

  setListeners = () => {
    document.getElementById('next-button').addEventListener('click', this.refresh);
  }

  removeListeners = () => {
    document.getElementById('next-button').removeEventListener('click', this.refresh);
  }
}

new AppForm();