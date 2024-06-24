// 给出的Uint8Array
const uint8Array = Uint8Array.from([
    104, 116, 116, 112, 115,  58,  47,  47,
    115, 116, 117, 100, 121, 112, 121,  46,
     98, 108, 111, 103,  46,  99, 115, 100,
    110,  46, 110, 101, 116,  32,  45,  32,
    229, 176, 143, 233, 177, 188, 231, 165,
    158
]);

// 使用 TextDecoder 将 bytes 转换为字符串
const textDecoder = new TextDecoder();
const decodedString = textDecoder.decode(uint8Array);

console.log(decodedString);