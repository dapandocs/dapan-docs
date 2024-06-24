# JS逆向之 MD5 加密算法特征全方位解析

> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
>
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等

逆向过程中，`MD5` 加密是常见的加密算法，但是你知道：

- `MD5` 加密算法的特征是什么？
- 如何多场景快速使用 `MD5` 加密算法？
- 如何手写 `MD5` 加密算法，了解其实现原理?
- 如何魔改 `MD5` 加密算法，实现自定义加密规则？

`MD5` 除了被称为哈希函数，还可以被称为消息摘要算法（Message Digest Algorithm）。其特点如下：

### MD5算法特点

`MD5` 算法首先会初始化 4 个 32 位寄存器 A, B, C, D 的初始值。每个哈希块都会经过多次迭代操作，最终将这些初始值进行多次修改和迭代，得到最终的 MD5 哈希值。

#### 初始变量值

MD5 算法初始值（十六进制表示）以及相应的十进制表示如下：
- A = 0x67452301 (十进制：1732584193)
- B = 0xefcdab89 (十进制：4023233417，转为有符号32位整数是 -271733879)
- C = 0x98badcfe (十进制：2562383102，转为有符号32位整数是 -1732584194)
- D = 0x10325476 (十进制：271733878)

在 MD5 算法的初始化阶段，这四个寄存器的初始值是：

```plaintext
A = 0x67452301  // 1732584193
B = 0xefcdab89  // -271733879
C = 0x98badcfe  // -1732584194
D = 0x10325476  // 271733878
```

这个阶段，实现 `MD5` 需要一些固定的特征值，没有这些特征值，就无法实现 `MD5` 算法。

我们可以通过密文特征和搜索源码特征值的办法快速判断是否为 `MD5` 算法。

**密文特征：**

- 密文一般为 `16` 位或者 `32` 位，其中 `16` 位是取的 `32` 位第 9~24 位的值；
- 组成方式为字母（a-f）和数字（0-9）混合，字母可以全部是大写或者小写。

**源码特征值：**

- `0123456789ABCDEF`、`0123456789abcdef` (转十六进制使用)

- `1732584193`、`-271733879`、`-1732584194`、`271733878` (初始变量值)

- `0x67452301`、`0xefcdab89`、`0x98badcfe`、`0x10325476` (初始变量值)

### 使用 Node 环境内置库 crypto

```javascript

const crypto = require('crypto');

const input = "https://studypy.blog.csdn.net";

const md5Hash = crypto.createHash('md5').update(input).digest('hex');

const md5Output32 = md5Hash.toString();

const md5Output32UpperCase = md5Output32.toUpperCase();

// 8表示从字符串的第9个字符（因为索引从0开始计数）开始提取，24（包括）表示提取这个开始位置之前的字符
const md5Output16 = md5Output32.slice(8, 24);

const md5Output16UpperCase = md5Output16.toUpperCase();

console.log("md5加密后的32位字符串:", md5Output32); // 提示：这里的输出将根据你的input变化
console.log("md5加密后的32位字符串（大写）:", md5Output32UpperCase); 
console.log("md5加密后的16位字符串:", md5Output16); 
console.log("md5加密后的16位字符串（大写）:", md5Output16UpperCase);
```

### 使用第三方库 crypto-js

首先，你需要确保你已经安装了 crypto-js 库。如果没有安装，可以使用 npm 命令进行安装：

```javascript
npm install crypto-js
```

```javascript
const CryptoJS = require("crypto-js");

const input = "https://studypy.blog.csdn.net";

const md5Output32 = CryptoJS.MD5(input).toString();

const md5Output32UpperCase = md5Output32.toUpperCase();

// 8表示从字符串的第9个字符（因为索引从0开始计数）开始提取，24（包括）表示提取这个开始位置之前的字符
const md5Output16 = md5Output32.slice(8, 24);

const md5Output16UpperCase = md5Output16.toUpperCase();

console.log("md5加密后的32位字符串:", md5Output32);
console.log("md5加密后的32位字符串（大写）:", md5Output32UpperCase);
console.log("md5加密后的16位字符串:", md5Output16);
console.log("md5加密后的16位字符串（大写）:", md5Output16UpperCase);
```

### 纯源码实现

```javascript
// 不借助官方或者第三方库，纯源码实现

function md5Hash(instring) {
    var hexcase = 0;   // 十六进制输出格式：0 - 小写；1 - 大写
    var b64pad = "";  // base-64 填充字符。为严格 RFC 合规使用 "="

    /*
     * 这些是你通常会调用的函数
     * 它们接受字符串参数并返回十六进制或 base-64 编码的字符串
     */
    function hex_md5(s) {
        return rstr2hex(rstr_md5(str2rstr_utf8(s)));
    }

    function b64_md5(s) {
        return rstr2b64(rstr_md5(str2rstr_utf8(s)));
    }

    function any_md5(s, e) {
        return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
    }

    function hex_hmac_md5(k, d) {
        return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
    }

    function b64_hmac_md5(k, d) {
        return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
    }

    function any_hmac_md5(k, d, e) {
        return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
    }

     /*
     * 计算原始字符串的 MD5
     */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
     * 计算 HMAC-MD5，对一个密钥和一些数据（原始字符串）
     */
    function rstr_hmac_md5(key, data) {
        var bkey = rstr2binl(key);
        if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    
    /*
     * 将原始字符串转换为十六进制字符串
     */
    function rstr2hex(input) {
        try {
            hexcase
        } catch (e) {
            hexcase = 0;
        }
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
     * 将原始字符串转换为 base-64 字符串
     */
    function rstr2b64(input) {
        try {
            b64pad
        } catch (e) {
            b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8) output += b64pad;
                else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    }

    /*
     * 将原始字符串转换为任意编码的字符串
     */
    function rstr2any(input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;

         // 将数据转换为UTF-16表示的大端字符数组, 作为被除数
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }

        // 重复进行长除法, 把数据认为二进制串
        // encoding的长度作为除数, 商作为下一步除数
        var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }

       // 把余数转换为输出字符串
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);

        return output;
    }

    /*
     * 将字符串按照 utf-8 编码
     * 效率考虑, 假设输入是有效的 utf-16
     */
    function str2rstr_utf8(input) {
        var output = "";
        var i = -1;
        var x, y;

        while (++i < input.length) {
             // 解码 utf-16 代理对
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }

             // 将输出按 utf-8 编码
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
                    0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
        }
        return output;
    }

     /*
     * 将字符串按照 utf-16 小端编码
     */
    function str2rstr_utf16le(input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
                (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    }

    function str2rstr_utf16be(input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                input.charCodeAt(i) & 0xFF);
        return output;
    }

   /*
     * 将原始字符串转换为小端字节序数组
     * 字符 >255 的高字节会被忽略
     */
    function rstr2binl(input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr(input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }

    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    return hex_md5(instring);
}

const input = "https://studypy.blog.csdn.net";
const md5Output32  = md5Hash(input);
const md5Output32UpperCase = md5Output32.toUpperCase();

// 8表示从字符串的第9个字符（因为索引从0开始计数）开始提取，24（包括）表示提取这个开始位置之前的字符
const md5Output16 = md5Output32.slice(8, 24);

const md5Output16UpperCase = md5Output16.toUpperCase();

console.log("md5加密后的32位字符串:", md5Output32);
console.log("md5加密后的32位字符串（大写）:", md5Output32UpperCase);
console.log("md5加密后的16位字符串:", md5Output16);
console.log("md5加密后的16位字符串（大写）:", md5Output16UpperCase);
```

### MD5魔改思路

#### 修改初始变量值

MD5算法的初始变量值由四个32位寄存器组成，分别是A、B、C和D。这些变量初始值通常被设定为特定的十六进制数。在标准MD5算法中，它们的值分别为：
- A = 0x67452301
- B = 0xefcdab89
- C = 0x98badcfe
- D = 0x10325476
如果我们决定“魔改”这一部分，我们可以选择其他的值作为这四个寄存器的初始值。比如，我们可以选择将它们的初始值都设置为一些简单的数字，或者完全随机的值：
- A' = 0x12345678
- B' = 0x87654321
- C' = 0xfedcba98
- D' = 0x89abcdef
通过这样的修改，即使是相同的输入数据，最终生成的哈希值也将完全不同，因为初始的状态改变了。

***创作不易，动动您发财的小手，点赞关注一波，支持我创作更多对您有帮助的文章！***