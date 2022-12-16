import * as Conversion from "../Conversions.js";
const Hex = '2123006AD00F694CE120';
const Binary = '00100001001000110000000001101010110100000000111101101001010011001110000100100000';
// Get Binary from Hex
const _Binary = Conversion.Hex2Binary(Hex);
// Get Hex from Binary
const _Hex = Conversion.Binary2Hex(Binary);

if (Binary === _Binary) {
    console.log('Binary Conversion - PASSED');
} else {
    console.error('Binary Conversion - FAILED');
}

if (Hex === _Hex) {
    console.log('Hex Conversion - PASSED');
} else {
    console.error('Hex Conversion - FAILED');
}