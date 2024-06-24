# JS逆向之 Base64 加密算法特征全方位解析

> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
>
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等

逆向过程中，`Base64` 加密是常见的加密算法，但是你知道：

- `Base64` 加密算法的特征是什么？
- 如何多场景快速使用 `Base64` 加密算法？
- 如何手写 `Base64` 加密算法，了解其实现原理?
- 如何魔改 `Base64` 加密算法，实现自定义加密规则？

`Base64` 是一种常见的二进制到文本编码方法，主要用于表示传输8-bit字节码（例如图像、音频文件）等数据。其特点如下：

### Base64特点

#### 字符集

Base64使用64个字符来表示数据，包括大小写字母、数字和两个特殊符号。这些字符为：

- 大写字母：A-Z（26个）
- 小写字母：a-z（26个）
- 数字：0-9（10个）
- 特殊符号：通常为“+”和“/”

#### 加密后长度

为了保证数据长度是4的倍数，Base64编码通常会使用“=”字符进行填充（padding）。这就是为什么会看到加密密文末尾会有 `=` 的原因。


### 使用内置函数 btoa 和 atob 

需要注意的是函数仅支持编码 `Latin1` 字符集，所以像汉字这样的字符集无法编码，需要将字符串作为 URL 进行编码后再进行 `Base64` 编码。

```javascript
// 定义示例字符串
const string = "https://studypy.blog.csdn.net";
const stringChinese = "https://studypy.blog.csdn.net - 小鱼神1024";

// 英文字符串的Base64编码和解码
const resultEncodedString = btoa(string);       // 使用 btoa 进行Base64编码
const resultDecodedString = atob(resultEncodedString); // 使用 atob 进行Base64解码

/**
 * 将Unicode字符串编码为Base64字符串
 * @param {string} str - 要编码的Unicode字符串
 * @returns {string} - 编码后的Base64字符串
 */
function encodeBase64Unicode(str) {
    // 使用TextEncoder将字符串编码为UTF-8字节数组
    const utf8Bytes = new TextEncoder().encode(str);
    // 将字节数组转换为字符串
    const base64String = btoa(String.fromCharCode.apply(null, utf8Bytes));
    return base64String;
}

/**
 * 将Base64字符串解码为Unicode字符串
 * @param {string} base64 - 要解码的Base64字符串
 * @returns {string} - 解码后的Unicode字符串
 */
function decodeBase64Unicode(base64) {
    // 使用atob将Base64字符串解码为二进制字符串
    const binaryString = atob(base64);
    // 将二进制字符串转换为Uint8Array字节数组
    const bytes = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
    // 使用TextDecoder将字节数组解码为字符串
    const decodedString = new TextDecoder().decode(bytes);
    return decodedString;
}

// 中文字符串的Base64编码和解码
const resultEncodedChinese = encodeBase64Unicode(stringChinese); // 编码
const resultDecodedChinese = decodeBase64Unicode(resultEncodedChinese); // 解码

// 输出结果
console.log("Base64 英文编码值:", resultEncodedString);  // aHR0cHM6Ly9zdHVkeXB5LmJsb2cuY3Nkbi5uZXQ=
console.log("Base64 英文解码值:", resultDecodedString);  // https://studypy.blog.csdn.net
console.log("Base64 中文编码值:", resultEncodedChinese); // aHR0cHM6Ly9zdHVkeXB5LmJsb2cuY3Nkbi5uZXQgLSDlsI/psbznpZ4xMDI0
console.log("Base64 中文解码值:", resultDecodedChinese); // https://studypy.blog.csdn.net - 小鱼神1024
```

### 使用 Node 环境内置方法

```javascript
// 定义一个包含中文以及数字的示例字符串
const stringChinese = "https://studypy.blog.csdn.net - 小鱼神1024";

// 使用Buffer对象进行Base64编码
// 1. 使用new Buffer.from()将字符串转换为Buffer对象
// 2. 调用toString("base64")方法将Buffer对象转换为Base64编码的字符串
const resultEncoded = new Buffer.from(stringChinese).toString("base64");

// 使用Buffer对象进行Base64解码
// 1. 使用new Buffer.from()将Base64编码的字符串转换为Buffer对象
// 2. 调用toString()方法将Buffer对象转换回原始字符串
const resultDecoded = new Buffer.from(resultEncoded, "base64").toString();

// 输出Base64编码值
console.log("Base64 编码值:", resultEncoded);  // 输出: aHR0cHM6Ly9zdHVkeXB5LmJsb2cuY3Nkbi5uZXQgLSDlsI/psbznpZ4xMDI0

// 输出Base64解码值
console.log("Base64 解码值:", resultDecoded);  // 输出: https://studypy.blog.csdn.net - 小鱼神1024
```

### 使用第三方库 crypto-js

首先，你需要确保你已经安装了 crypto-js 库。如果没有安装，可以使用 npm 命令进行安装：

```javascript
npm install crypto-js
```

```javascript
// 引入crypto-js库
const CryptoJS = require('crypto-js');

// 定义一个包含中文以及数字的示例字符串
const stringChinese = "https://studypy.blog.csdn.net - 小鱼神1024";

// 使用CryptoJS进行Base64编码
// 1. CryptoJS.enc.Utf8.parse(stringChinese) 将字符串转换为WordArray对象，这个对象是CryptoJS内部的字节数组表示形式
// 2. CryptoJS.enc.Base64.stringify() 方法将WordArray对象转换为Base64编码字符串
const resultEncoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(stringChinese));

// 使用CryptoJS进行Base64解码
// 1. CryptoJS.enc.Base64.parse(resultEncoded) 将Base64编码字符串转换为WordArray对象
// 2. CryptoJS.enc.Utf8.stringify() 方法将WordArray对象转换回原始字符串
const resultDecoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(resultEncoded));

// 输出Base64编码值
console.log("Base64 编码值:", resultEncoded);  // 输出: aHR0cHM6Ly9zdHVkeXB5LmJsb2cuY3Nkbi5uZXQgLSDlsI/psbznpZ4xMDI0

// 输出Base64解码值
console.log("Base64 解码值:", resultDecoded);  // 输出: https://studypy.blog.csdn.net - 小鱼神1024
```

### 纯源码实现

```javascript
// 定义一个Base64对象，包含编码、解码以及UTF-8编码和解码的方法
var Base64 = {
    // Base64字符表，用于编码和解码过程中各索引值的对应字符
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // 将输入字符串进行Base64编码的方法
    encode: function(input) {
        var output = ""; // 最终的Base64编码结果
        var chr1, chr2, chr3; // 三个字符的ASCII码
        var enc1, enc2, enc3, enc4; // 四个6位Base64字符的索引
        var i = 0;

        // 首先将输入字符串进行UTF-8编码
        input = Base64.utf8Encode(input);

        // 循环每次处理三个字符，进行编码
        while (i < input.length) {
            // 读取三个字符的ASCII码
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            // 将三个字符的24位二进制数据拆分为4个6位的字符索引值
            enc1 = chr1 >> 2; // 取chr1的前6位
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); // 取chr1的后2位，加上chr2的前4位
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); // 取chr2的后4位，加上chr3的前2位
            enc4 = chr3 & 63; // 取chr3的后6位

            // 处理不足3字节的情况，chr2和chr3可能为空，处理这种情况下的填充等号
            if (isNaN(chr2)) {
                enc3 = enc4 = 64; // 等号'='的索引值为64
            } else if (isNaN(chr3)) {
                enc4 = 64; // 等号'='的索引值为64
            }

            // 根据Base64字符表生成最终的4个Base64字符
            output += Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                      Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
        }

        return output; // 返回Base64编码字符串
    },

    // 将Base64编码的字符串进行解码的方法
    decode: function(input) {
        var output = ""; // 最终的解码结果
        var chr1, chr2, chr3; // 三个字符的ASCII码
        var enc1, enc2, enc3, enc4; // 四个Base64字符的索引值
        var i = 0;

        // 移除输入字符串中所有非Base64字符
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        // 循环每次处理四个Base64字符，进行解码
        while (i < input.length) {
            // 读取四个Base64字符的索引值
            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            // 将4个6位索引值合并为3个8位的字符编码
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            // 将解码后的字符添加到输出字符串
            output += String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output += String.fromCharCode(chr2);
            }

            if (enc4 !== 64) {
                output += String.fromCharCode(chr3);
            }
        }

        // 最后将UTF-8编码的数据还原为原始字符串
        output = Base64.utf8Decode(output);

        return output; // 返回原始字符串
    },

    // 将字符串转换为UTF-8编码的方法
    utf8Encode: function(string) {
        // 将所有CRLF转换为LF
        string = string.replace(/\r\n/g, "\n");
        var utfText = ""; // 最终的UTF-8编码结果

        // 循环每个字符，进行UTF-8编码
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utfText += String.fromCharCode(c); // ASCII字符编码不变
            } else if ((c > 127) && (c < 2048)) {
                // 双字节字符 (0x0080-0x07FF)
                utfText += String.fromCharCode((c >> 6) | 192); // 取前6位，加上110xxxxx标志
                utfText += String.fromCharCode((c & 63) | 128); // 取后6位，加上10xxxxxx标志
            } else {
                // 三字节字符 (0x0800-0xFFFF)
                utfText += String.fromCharCode((c >> 12) | 224); // 取前4位，加上1110xxxx标志
                utfText += String.fromCharCode(((c >> 6) & 63) | 128); // 取中间6位，加上10xxxxxx标志
                utfText += String.fromCharCode((c & 63) | 128); // 取后6位，加上10xxxxxx标志
            }
        }

        return utfText; // 返回UTF-8编码字符串
    },

    // 将UTF-8编码的字符串解码为原始字符串的方法
    utf8Decode: function(utfText) {
        var string = ""; // 最终解码结果
        var i = 0;
        var c, c1, c2, c3;

        // 循环每个字符，进行解码
        while (i < utfText.length) {
            c = utfText.charCodeAt(i);

            if (c < 128) {
                // 单字节字符 (0x00-0x7F)
                string += String.fromCharCode(c); // ASCII字符，不变
                i++;
            } else if ((c > 191) && (c < 224)) {
                // 双字节字符 (0xC0-0xDF)
                c2 = utfText.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)); // 还原原字符
                i += 2;
            } else {
                // 三字节字符 (0xE0-0xFF)
                c2 = utfText.charCodeAt(i + 1);
                c3 = utfText.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)); // 还原原字符
                i += 3;
            }
        }

        return string; // 返回原始字符串
    }
};

// 示例字符串，包含中文和数字
const stringChinese = "https://studypy.blog.csdn.net - 小鱼神1024";

// 对字符串进行Base64编码
var resultEncoded = Base64.encode(stringChinese);

// 对Base64编码的字符串进行解码
var resultDecoded = Base64.decode(resultEncoded);

// 输出Base64编码值
console.log("Base64 编码值:", resultEncoded);  // 输出: aHR0cHM6Ly9zdHVkeXB5LmJsb2cuY3Nkbi5uZXQgLSDlsI/psbznpZ4xMDI0

// 输出Base64解码值
console.log("Base64 解码值:", resultDecoded);  // 输出: https://studypy.blog.csdn.net - 小鱼神1024
```

### 魔改Base64

所谓的 `魔改Base64` ，一般是指基于标准的Base64编码形式进行自定义修改。这些自定义修改可以包括改变编码字符集、调整填充字符、实现自定义的序列化手段等等。以下是几种常见的 `魔改Base64` 实现方式及其示例：

#### 修改字符集

在标准Base64中，使用的字符集是 A-Z, a-z, 0-9, +, /。魔改的Base64可能会替换这些字符。例如，将 + 和 / 分别替换成 - 和 _。这种修改在URL中非常常见，因为这避免了使用特殊字符。

示例如下：

- 标准Base64: MDEyMzQ1Njc4OTA+ (明文: 01234567890)

- 魔改Base64: MDEyMzQ1Njc4OTA- (将 + 替换成 -)

#### 调整填充字符

标准Base64以 = 作为填充字符，以确保编码后的字符串长度是4的倍数。魔改Base64可能会使用不同的填充字符，或者完全去掉填充。

示例如下：

- 标准Base64: SGVsbG8= (明文: Hello)

- 无填充魔改: SGVsbG8 (移除了 =)


#### 自定义编码/解码规则

一些系统可能会定义专属的编码和解码规则，比如重新排列字符集，或者按照特定的位移规则进行编码。

示例如下：

- 自定义字符集: 假设使用 0-9 和 a-Z 排列
    - 标准字符集：ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
    - 自定义字符集：0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/
- 假设明文 “01” 编码成 Base64 在标准字符集中为 MDE=
    - 在自定义字符集中：可能会变为 6xq=

#### 魔改举例

```javascript
function customBase64Encode(data) {
    // 标准Base64 编码
    let encoded = btoa(data);
    // 魔改部分
    encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return encoded;
}

function customBase64Decode(data) {
    // 魔改部分转回标准Base64
    let base64_data = data.replace(/-/g, '+').replace(/_/g, '/');
    // 计算填充
    switch (base64_data.length % 4) {
        case 2:
            base64_data += '==';
            break;
        case 3:
            base64_data += '=';
            break;
    }
    // 解码
    let decoded = atob(base64_data);
    return decoded;
}

// 示例
let plainText = "https://studypy.blog.csdn.net";
let encodedText = customBase64Encode(plainText);
let decodedText = customBase64Decode(encodedText);

console.log(`明文: ${plainText}`);
console.log(`魔改Base64编码: ${encodedText}`); // aHR0cHM6Ly9zdHVkeXB5LmJsb2cuY3Nkbi5uZXQ
console.log(`标准Base64编码: ${btoa(plainText)}`); // aHR0cHM6Ly9zdHVkeXB5LmJsb2cuY3Nkbi5uZXQ=
console.log(`解码后的明文: ${decodedText}`);
```

Base64 是我们最常见的编码，除此之外，其实还有 `Base16`、`Base32`、`Base58`、`Base85`、`Base100` 等。

***创作不易，动动您发财的小手，点赞关注一波，支持我创作更多对您有帮助的文章！***