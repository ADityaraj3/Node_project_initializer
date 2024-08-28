export const patterns = {
    number: /^\d+$/,
    float: /^(\d*\.{0,1}\d{0,2}$)/,
    
    alphabet: /^[\D ]*$/,
    alphabetOnly: /^[a-z A-Z ]*$/,
    alphaNumeric: /^[a-zA-Z0-9 ]*$/,
    emoji: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi,
    noSpace: /^\S*$/,
    // email : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    fullName: /^[a-z A-Z0-9'-]+$/,
    domainName: /^[0-9a-z][0-9a-z-]{0,}[0-9a-z]$/,
    dialCode :/^\d{1,4}$/,
    countryShortName : /^[A-Za-z]{1,3}$/,
    countryName : /^[A-Za-z\s]+$/,
    text: /^[A-Za-z\s]+$/,
    
    contactNumber:/^\d{10}$/,
    personnelNumber:/^\d{8}$/,

    // password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/,
    password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // domainName : /[^a-z]/gi,
}