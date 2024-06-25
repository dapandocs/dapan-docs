# JS逆向：由 words 、sigBytes 引发的一系列思考与实践

> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
>
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等

在做JS逆向时，你是否经常看到 `words` 和 `sigBytes` 这两个属性呢，比如：

```javascript
{
    words: [2003644449, 1081552243, 594308145, 1718382376], 
    sigBytes: 16
}
```

如果发现了它们的踪迹，那恭喜你了。基本可以确定，网站是使用 `crypto-js` 库中某一个加密算法实现加密的。

### words 、sigBytes 它们是什么

在 `crypto-js` 这个流行的 `JavaScript` 加密库中，`words` 和 `sigBytes` 是 `CryptoJS.lib.WordArray` 对象的两个重要属性。

`words` 数组是 `WordArray` 对象的主体，它用于存储加密数据。在 crypto-js 中，一个 `word` 是由32位（或者说是4个字节）组成的，因此每个元素在 words 数组中实际上可以表示4个字节的数据。

在计算机系统中，一个32位的整数可以存储从-2,147,483,648到2,147,483,647的整数值（如果是有符号整数），或者从0到4,294,967,295（如果是无符号整数）。这种表示范围是因为32位可以表示2^32（即4,294,967,296）个不同的值。

>**补充**
>
>在计算机和信息技术中，32位（4字节）是一个常用的数据大小单位，用来表示数据的存储或处理容量。具体来讲：
>
> - 1位（bit）：是计算机数据的最基本单位，代表一个二进制数字，即0或1。
> - 1字节（Byte）：通常由8位组成，是基本的数据存储单位。1字节可以表示0到255（或者在二进制中是00000000到11111111）之间的一个数值。
> - 32位：则相当于4字节（4 Bytes），因为1字节是8位，所以4字节就是4 * 8 = 32位。

### 如何生成 WordArray 对象

两种解决办法：

#### 通过 CryptoJS.enc.Utf8.parse 生成

如果已知utf8编码的明文，则可以使用 `CryptoJS.enc.Utf8.parse` 方法生成 `WordArray` 对象。

```javascript
const CryptoJS = require("crypto-js");

// 生成 WordArray 对象
const keyWordArray = CryptoJS.enc.Utf8.parse("wm0!@w-s#ll1flo(");
console.log(keyWordArray);
```


#### 通过 CryptoJS.lib.WordArray.create 生成

```javascript
const CryptoJS = require("crypto-js");
const words = [2003644449, 1081552243, 594308145, 1718382376]; // 32位整数数组（words数组）
const sigBytes = 16;

// 使用 CryptoJS 转换字节数组到 WordArray
const keyWordArray = CryptoJS.lib.WordArray.create(words, sigBytes);

console.log(keyWordArray);
```


### 如何将 WordArray 转化为 UTF-8 字符串

```javascript
const CryptoJS = require("crypto-js");
const wordArrayBytes = {
    words: [ 2003644449, 1081552243, 594308145, 1718382376 ],
    sigBytes: 16
};

// 将 WordArray 转换为 UTF-8 字符串
const key = CryptoJS.enc.Utf8.stringify(wordArrayBytes);
console.log(key);

// wm0!@w-s#ll1flo(
```

### 如何将 WordArray 转化为十六进制Hex

```javascript
const CryptoJS = require("crypto-js");
const wordArrayBytes = {
    words: [ 2003644449, 1081552243, 594308145, 1718382376 ],
    sigBytes: 16
};

// 将 WordArray 转换为十六进制Hex
const key = CryptoJS.enc.Hex.stringify(wordArrayBytes);
console.log(key);

// 776d302140772d73236c6c31666c6f28
```

那如何判断一个字符串是否为有效的十六进制字符串，可以检查以下几点：

- **字符串长度**：十六进制字符串的长度应该是偶数。

- **字符范围**：十六进制字符串只能包含 0-9 以及 a-f 和 A-F 这些字符。

可以编写一个函数来实现这个逻辑：

```javascript
// 判断一个字符串是否为十六进制字符串的函数
function isHexString(str) {
    // 检查长度是否为偶数
    if (str.length % 2 !== 0) {
        return false;
    }
    // 使用正则表达式检查字符串是否只包含合法的十六进制字符（0-9, a-f, A-f）
    const hexRegex = /^[0-9a-fA-F]+$/;
    return hexRegex.test(str);
}

// 示例测试
const testHexString1 = "776d302140772d73236c6c31666c6f28";
const testHexString2 = "1a2b3g4d5e"; // 包含非法字符 'g'
const testHexString3 = "123";        // 长度为奇数

console.log(isHexString(testHexString1)); // 输出：true
console.log(isHexString(testHexString2)); // 输出：false
console.log(isHexString(testHexString3)); // 输出：false
```

### WordArray整数数组、Hex十六进制、ByteArray字节数组、UTF-8字符串之间的相互转换

```javascript
// 判断一个数组是否为字节数组（每个元素为0到255之间的整数）
function isByteArray(arr) {
    // 首先检查是否为数组
    if (!Array.isArray(arr)) {
        return false;
    }
    // 检查每个元素是否为0到255之间的整数
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || arr[i] < 0 || arr[i] > 255 || !Number.isInteger(arr[i])) {
            return false;
        }
    }
    return true;
}

// 将字节数组转换为十六进制字符串的函数
function bytesToHex(bytes) {
    if (!isByteArray(bytes)) {
        throw new Error('输入必须是字节数组');
    }
    return bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// 将十六进制字符串转换为字节数组的函数
function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
}

// 将32位整数数组（words数组）转换为字节数组的函数
function wordsToBytes(words) {
    let bytes = [];
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        bytes.push((word >> 24) & 0xFF);
        bytes.push((word >> 16) & 0xFF);
        bytes.push((word >> 8) & 0xFF);
        bytes.push(word & 0xFF);
    }
    return bytes;
}

// 将字节数组转换为UTF-8字符串的函数
function bytesToStringUTF8(bytes) {
    if (!isByteArray(bytes)) {
        throw new Error('输入必须是字节数组');
    }
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
}

let key = { words: [2003644449, 1081552243, 594308145, 1718382376], sigBytes: 16 };

// 将key的words数组转换为字节数组
let keyBytes = wordsToBytes(key.words);

// 将字节数组转换为十六进制字符串，测试使用
let keyHex = bytesToHex(keyBytes);

// 打印key和iv的十六进制字符串
console.log("十六进制Hex:", keyHex);

// 将十六进制字符串还原为字节数组，以确保转换过程的无损失和准确性，测试使用
let keyBytesFromHex = hexToBytes(keyHex);

// 将字节数组转换为UTF-8字符串，得到最终的字符串表示
let keyString = bytesToStringUTF8(keyBytes);

// 打印key和iv的UTF-8字符串表示
console.log("字符串UTF-8:", keyString);
```

### 用 Uint8Array 生成字节数组

Uint8Array 的特点包括以下几点：

- **无符号整数**：Uint8Array 存储的是无符号的 8 位整数（0 到 255），因此每个元素的取值范围是从 0 到 255。这意味着每个元素可以表示一个字节的数据，适用于处理字节数据和二进制数据。

- **定长数组**：Uint8Array 是一种定长数组，它的长度在创建时就已经确定，并且不能动态改变。这有助于提高操作效率和性能，尤其在处理大量数据时非常有用。

```javascript
// 用 Uint8Array 生成字节数组
const uint8Array = Uint8Array.from([
    119, 109, 48, 33, 64,
    119, 45, 115, 35, 108,
    108, 49, 102, 108, 111,
    40
]);

// 使用 TextDecoder 将 bytes 转换为字符串
const textDecoder = new TextDecoder();
const decodedString = textDecoder.decode(uint8Array);

console.log(decodedString);

// wm0!@w-s#ll1flo(
```

### 为什么 AES、DES等加密时，要先转化 WrodArray

转化为32位二进制数据再进行加密是出于以下几个主要原因：

- **加密算法的要求**：几乎所有的现代加密算法，包括对称加密（如AES）和非对称加密（如RSA），在底层操作时都是以二进制数据形式工作的。这是因为加密算法在设计时需要操作位（bit）和字节（byte），而不是高级语言中的文本或数字等类型。因此，将数据转换为二进制形式是执行这些算法的必要步骤。

- **数据类型的统一**：在加密通信或数据存储的上下文中，可能需要处理各种类型的数据（如文本、数字、图像等）。将所有数据统一转换为二进制格式可以简化加密过程，因为无论原始数据是什么类型，加密算法都按照相同的方式处理二进制数据。

- **安全性增强**：通过转换为二进制数据，可以确保在加密过程中原始数据的内容不会因其格式或结构而泄露信息。此外，某些加密方式（如块加密）要求数据以特定大小的块来处理。将数据预先转化为二进制形式，可以更容易地按块对数据进行操作和填充。

- **性能优化**：直接对二进制数据进行操作比对高级数据类型（如字符串或对象）进行操作要有效率得多。加密和解密操作通常需要大量的数据处理工作，特别是在数据量大或需求高性能的应用场景中。预先将数据转换为二进制格式，可以最大限度地减少处理时间和资源消耗。