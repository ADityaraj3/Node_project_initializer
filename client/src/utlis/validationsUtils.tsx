import { ValidationSet, ValidationObj } from "../../../../Office_Projects/telekomsozial-internal-application-tool-frontend/src/utils/interface";
var validationFunctions = {
  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} length allowed length of the string.
   *
   * Returns true/false based on if the value length is not more than specified length.
   */
  MaxLength: (value: string | number | string[], validation: ValidationObj) => {
    if (!value) {
      return true;
    }
    let length = validation.value || 0;
    if (Array.isArray(value)) {
      let allValuesValid = true;
      for (let val of value) {
        if (length < value.length) {
          allValuesValid = false;
          break;
        }
      }
      return allValuesValid;
    }
    value = `${value}`;

    return length >= value.length;
  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} length allowed length of the string.
   *
   * Returns true/false based on if the value length is not more than specified length.
   */

  MinLength: (value: string | number, validation: ValidationObj) => {
    if (!value) {
      return true;
    }
    let length = validation.value || 0;
    if (Array.isArray(value)) {
      let allValuesValid = true;
      for (let val of value) {
        if (length > value.length) {
          allValuesValid = false;
          break;
        }
      }
      return allValuesValid;
    }
    value = `${value}`;
    return length <= value.length;
  },

  Length: (value: string | number, validation: ValidationObj) => {
    if (!value) {
      return true;
    }

    let length = validation.value || 0;

    if (Array.isArray(value)) {
      let allValuesValid = true;
      for (let val of value) {
        if (length != val.length) {
          allValuesValid = false;
          break;
        }
      }
      return allValuesValid;
    }
    value = `${value}`;
    return (length == value.length);
  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} min minimum value allowed.
   */
  Min: (value: number | string | string[], validation: ValidationObj) => {
    let min = validation.value || 0;
    if (!value) {
      return true;
    }
    return value >= min;
  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} max maximum value allowed.
   */
  Max: (value: number | string | string[], validation: ValidationObj) => {
    let max = validation.value || 0;
    if (!value) {
      return true;
    }
    return value <= max;
  },

  /**
   * @param {value} value the value that needs to be tested.
   *
   * Returns true/false based on if the value is not null, undefined and empty string.
   */
  Required: (value: any) => {
    // console.log("re-value",value);
    
    if (Array.isArray(value)) {
      return value.length;
    }
    return (
      value !== undefined && value !== null && value.toString().trim() !== ""
    );
  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} regex regular expression that the value should satisfy.
   *
   * Returns true/false based on if the value passed the regular expression test or not.
   */
  Pattern: (value: string | number | string[], validation: ValidationObj) => {
    let regex = validation.expression || new RegExp("");
    if (!value) {
      return true;
    }
    if (Array.isArray(value)) {
      let allValuesValid = true;
      for (let val of value) {
        if (!regex.test(val)) {
          allValuesValid = false;
          break;
        }
      }
      return allValuesValid;
    }
    value = `${value}`;
    // return true;
    return regex.test(value);

  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value}  comparisonValue expression that the value should satisfy.
   *
   * Returns true/false based on if the value is same as comparisonValue.
   */

  CompareValue: (value: any, comparisonValue: any) => {
    return value === comparisonValue;
  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} regex regular expression that the value should satisfy.
   *
   * Returns true/false based on if the value passed the regular expression test or not.
   */
  StringValidate: (
    value: string | number | string[],
    validation: ValidationObj
  ) => {
    let regex = validation.expression || new RegExp("");
    if (!value) {
      return true;
    }
    value = `${value}`;
    return regex.test(value);
  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} regex regular expression that the value should satisfy.
   *
   * Returns true/false based on if the value passed the regular expression test or not.
   */
  IntegerValidate: (
    value: string | number | string[],
    validation: ValidationObj
  ) => {
    let regex = validation.expression || new RegExp("");
    if (!value) {
      return true;
    }
    value = `${value}`;
    return regex.test(value);
  },

  /**
   * @param {value} value the value that needs to be tested.
   * @param {value} regex regular expression that the value should satisfy.
   *
   * Returns true/false based on if the value passed the regular expression test or not.
   */
  WordLimitValidate: (
    value: string | number | string[],
    validation: ValidationObj
  ) => {
    let length = validation.value || 0;
    const arr = value.toString().split(" ");
    const noOfWords = arr.filter((word) => word !== "").length;

    if (noOfWords > length) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * @param {object} form  form values to be validated
   * @param {[object]} validations  validation rules for the form
   *
   * @returns {boolean} Return true if form is Valid
   */
  checkFormValidity: (
    form: any,
    validations: ValidationSet,
    CompareValue?: any
  ) => {
   

    
    for (let key in form) {
      for (let validation of validations[key] || []) {

        if (validation.type == "CompareValue") {          

          if (
            !validation.disabled &&
            !validationFunctions[validation.type](form[key],CompareValue)
          ) {
            return false;
          }
        } else if (validation.type != "checkFormValidity") {

          if (
            !validation.disabled &&
            !validationFunctions[validation.type](form[key], validation)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  },
};

export default validationFunctions;
