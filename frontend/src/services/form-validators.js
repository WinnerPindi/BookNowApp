export class ValidatorService{
    static min(value, min) {
        if(ValueSetter.length < min) {
            return `Veuillez tapper au moins ${min} lettre(s)`;
        }
    }

    static max(value, max) {
        if(ValueSetter.length > max) {
            return `Veuillez tapper au plus ${max} lettre(s)`;
        }
    }
}