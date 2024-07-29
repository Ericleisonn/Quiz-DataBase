import PasswordValidator from "password-validator";

export default function isValidatePassword(password){
    var schema = new PasswordValidator()

    schema.is().min(8)
    schema.is().max(20)
    schema.has().uppercase()
    schema.has().lowercase()
    schema.has().digits(2)
    schema.has().not().spaces()

    return schema.validate(password)
}