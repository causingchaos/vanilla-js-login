class AppForm {
  constructor() {
    this.form = [];
    this.step = 0;
    this.currentGroup = null;

    this.setListeners();
    this.getForm();
    document.getElementById('next-button').disabled = true;
    this.refresh(); //incremenet step from 0 to 1, and update 'none' to 'block'
    this.check();
    this.pageType = window.location.href.includes('login') ? 'login' : 'signup';
  }

  refresh = () => {
    this.step++;
    //console.log("step: "+ this.step);
    if (this.step <= this.form.length){ //check if were on last step in the form
      this.displayStep();
      this.removeListeners();
      document.getElementById('next-button').disabled = true;
      this.check();
    }
    else
      this.submit();
  }

  goBack = () => {
    if(this.step > 1) {
      this.currentInput().value = '';
      this.step--;
      this.displayStep();
      this.enableDisable();
    }
  }

  submit = () => console.log('SUBMIT');

  currentInput = () => this.form[this.step-1].input;
  previousInput = () => this.form[this.step-2].input;

  check = () => this.currentInput().addEventListener('keyup', this.enableDisable);

  enableDisable = () => {
    if(this.valid(this.currentInput())) {
      this.currentInput().classList.remove('invalid');
      this.setListeners();
      document.getElementById('next-button').disabled = false;
    }else{
      this.currentInput().classList.add('invalid');
      this.removeListeners();
      document.getElementById('next-button').disabled = true;
    }
  }

  valid = (input) => {
    const formType = input.id;
    console.log(formType);
    const value = input.value; 
    console.log(value); 
    //check for whitespace, return true if it's empty, false if whitespace found
    const empty = (str) => !str.split('').every(_char => _char !== ' ');
    console.log(value) 

    if( !value || empty(value) ) return false;
                                     //value exists and is not whitespaces
    if(this.pageType === 'login') return value && !empty(value); //doesnt need full address on login page

    switch(formType) {
      case 'email-input':
        return /\S+@\S+\.\S+/.test(value) //test for valid email

      case 'email-verification-input':
        return this.previousInput().value === value;

      case 'password-input':
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@$&!]{8,}/.test(value)

      // ( one digit ? )(one lower case)(1 upper case)(can contain symbols)(at least 8 long)
      case 'password-verification-input':
        return this.previousInput().value === value;

      default:
        return false;         
    }
  };

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
    document.getElementById('back-button').addEventListener('click', this.goBack);
  }

  removeListeners = () => {
    document.getElementById('next-button').removeEventListener('click', this.refresh);
  }
}

new AppForm();