import validator from 'validator';

/**
 * handle mouse house event to validate
 * input fields
 *  @param {*} event element recieving event
 * @returns {object} event
*/
const mouseOutHandler = (event) => {
  const { name, value, id } = event.target;
  let elementClassValue = event.target.className;
  const targetElement = document.getElementById(id);

  // validate the length of the input fields value
  if ((name === 'firstName' || name === 'lastName'
    || name === 'email' || name === 'bio')
    && (value.length > 0 && value.length < 2)) {
    if (elementClassValue.indexOf('field-length-ok') >= 0) {
      elementClassValue = elementClassValue
        .replace('field-length-ok', 'field-length-fail');
      targetElement.setAttribute('class', elementClassValue);
      const spanEle = event.target.nextSibling;
      const fieldName = event.target.name.toLowerCase();
      spanEle.innerHTML = `length of ${fieldName} must be greater than 2`;
      return event;
    }
  }

  // check for valid email
  if (name === 'email' && (!validator.isEmail(value))) {
    if (elementClassValue.indexOf('valid-email') >= 0) {
      elementClassValue = elementClassValue
        .replace('valid-email', 'invalid-email');
      targetElement.setAttribute('class', elementClassValue);
      const spanEle = event.target.nextSibling;
      spanEle.innerHTML = `please enter a valid ${event.target.name}`;
      return event;
    }
  }
};

export default mouseOutHandler;
