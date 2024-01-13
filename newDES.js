function generate(e, t, s) { //e = data , t = key , s = typeGenerate[encrypt/decrypt]
    let o = e;
    "encrypt" === s && (o = ("1" === l ? pad_iso9797_method1 : pad_iso9797_method2)(e));
    let d = "";
    var n, c = "encrypt" === s ? des_encrypt : des_decrypt;
    for (n of o.match(/.{16}/g)) d += c(t, n)
    return d
}

function pad_iso9797_method2(t) {
    return pad_iso9797_method1(t + "80")
}

function pad_iso9797_method1(t) {
    return t.length % 16 != 0 ? t.padEnd(16 * (Math.trunc(t.length / 16) + 1), "0") : t
}

function des_encrypt(t, e) {
    var a, n, i;
    return 16 != e.length ? null : 16 == t.length ? stringToHex(des(hexToString(t), hexToString(e), 1)) : 32 == t.length ? (a = hexToString(t.substr(0, 16)), n = hexToString(t.substr(16, 16)), i = des(a, hexToString(e), 1), i = des(n, i, 0), stringToHex(des(a, i, 1))) : 48 == t.length ? (a = hexToString(t.substr(0, 16)), n = hexToString(t.substr(16, 16)), t = hexToString(t.substr(32, 16)), i = des(a, hexToString(e), 1), i = des(n, i, 0), stringToHex(des(t, i, 1))) : null
}

function des_decrypt(t, e) {
    var a, n, i;
    return 16 != e.length ? null : 16 == t.length ? stringToHex(des(hexToString(t), hexToString(e), 0)) : 32 == t.length ? (a = hexToString(t.substr(0, 16)), n = hexToString(t.substr(16, 16)), i = des(a, hexToString(e), 0), i = des(n, i, 1), stringToHex(des(a, i, 0))) : 48 == t.length ? (a = hexToString(t.substr(0, 16)), n = hexToString(t.substr(16, 16)), i = des(hexToString(t.substr(32, 16)), hexToString(e), 0), i = des(n, i, 1), stringToHex(des(a, i, 0))) : null
}

function des(t, e, a) {
    var n, i, r, s, d, o, l, b, c, u = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756),
        p = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344),
        y = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584),
        v = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928),
        C = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080),
        m = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312),
        g = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154),
        h = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696),
        f = des_createKeys(t),
        A = 0,
        $ = e.length,
        F = 0,
        D = 32 == f.length ? 3 : 9,
        I = 3 == D ? a ? new Array(0, 32, 2) : new Array(30, -2, -2) : a ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
    for (result = "", tempresult = ""; A < $;) {
        for (o = e.charCodeAt(A++) << 24 | e.charCodeAt(A++) << 16 | e.charCodeAt(A++) << 8 | e.charCodeAt(A++), o = (o = (o = (o = (o = (o ^= (r = 252645135 & (o >>> 4 ^ (l = e.charCodeAt(A++) << 24 | e.charCodeAt(A++) << 16 | e.charCodeAt(A++) << 8 | e.charCodeAt(A++)))) << 4) ^ (r = 65535 & (o >>> 16 ^ (l ^= r))) << 16) ^ (r = 858993459 & ((l ^= r) >>> 2 ^ o))) ^ (r = 16711935 & ((l ^= r << 2) >>> 8 ^ o))) ^ (r = 1431655765 & (o >>> 1 ^ (l ^= r << 8))) << 1) << 1 | o >>> 31, l = (l ^= r) << 1 | l >>> 31, i = 0; i < D; i += 3) {
            for (b = I[i + 1], c = I[i + 2], n = I[i]; n != b; n += c) s = l ^ f[n], d = (l >>> 4 | l << 28) ^ f[n + 1], r = o, o = l, l = r ^ (p[s >>> 24 & 63] | v[s >>> 16 & 63] | m[s >>> 8 & 63] | h[63 & s] | u[d >>> 24 & 63] | y[d >>> 16 & 63] | C[d >>> 8 & 63] | g[63 & d]);
            r = o, o = l, l = r
        }
        l = l >>> 1 | l << 31, l = (l = (l = (l = (l ^= r = 1431655765 & ((o = o >>> 1 | o << 31) >>> 1 ^ l)) ^ (r = 16711935 & (l >>> 8 ^ (o ^= r << 1))) << 8) ^ (r = 858993459 & (l >>> 2 ^ (o ^= r))) << 2) ^ (r = 65535 & ((o ^= r) >>> 16 ^ l))) ^ (r = 252645135 & ((o ^= r << 16) >>> 4 ^ l)), o ^= r << 4, tempresult += String.fromCharCode(o >>> 24, o >>> 16 & 255, o >>> 8 & 255, 255 & o, l >>> 24, l >>> 16 & 255, l >>> 8 & 255, 255 & l), 512 == (F += 8) && (result += tempresult, tempresult = "", F = 0)
    }
    return result + tempresult
}

function des_createKeys(t) {
    pc2bytes0 = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964), pc2bytes1 = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697), pc2bytes2 = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272), pc2bytes3 = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144), pc2bytes4 = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256), pc2bytes5 = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488), pc2bytes6 = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746), pc2bytes7 = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568), pc2bytes8 = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578), pc2bytes9 = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488), pc2bytes10 = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800), pc2bytes11 = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744), pc2bytes12 = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128), pc2bytes13 = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);
    for (var e, a, n, i = new Array(32), r = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0), s = 0, d = 0, o = 0; o < 1; o++) {
        left = t.charCodeAt(s++) << 24 | t.charCodeAt(s++) << 16 | t.charCodeAt(s++) << 8 | t.charCodeAt(s++), right = t.charCodeAt(s++) << 24 | t.charCodeAt(s++) << 16 | t.charCodeAt(s++) << 8 | t.charCodeAt(s++), n = 252645135 & (left >>> 4 ^ right), right ^= n, left ^= n << 4, n = 65535 & (right >>> -16 ^ left), left ^= n, right ^= n << -16, n = 858993459 & (left >>> 2 ^ right), right ^= n, left ^= n << 2, n = 65535 & (right >>> -16 ^ left), left ^= n, right ^= n << -16, n = 1431655765 & (left >>> 1 ^ right), right ^= n, left ^= n << 1, n = 16711935 & (right >>> 8 ^ left), left ^= n, right ^= n << 8, n = 1431655765 & (left >>> 1 ^ right), right ^= n, n = (left ^= n << 1) << 8 | right >>> 20 & 240, left = right << 24 | right << 8 & 16711680 | right >>> 8 & 65280 | right >>> 24 & 240, right = n;
        for (var l = 0; l < r.length; l++) right = r[l] ? (left = left << 2 | left >>> 26, right << 2 | right >>> 26) : (left = left << 1 | left >>> 27, right << 1 | right >>> 27), left &= -15, right &= -15, e = pc2bytes0[left >>> 28] | pc2bytes1[left >>> 24 & 15] | pc2bytes2[left >>> 20 & 15] | pc2bytes3[left >>> 16 & 15] | pc2bytes4[left >>> 12 & 15] | pc2bytes5[left >>> 8 & 15] | pc2bytes6[left >>> 4 & 15], a = pc2bytes7[right >>> 28] | pc2bytes8[right >>> 24 & 15] | pc2bytes9[right >>> 20 & 15] | pc2bytes10[right >>> 16 & 15] | pc2bytes11[right >>> 12 & 15] | pc2bytes12[right >>> 8 & 15] | pc2bytes13[right >>> 4 & 15], i[d++] = e ^ (n = 65535 & (a >>> 16 ^ e)), i[d++] = a ^ n << 16
    }
    return i
}

function stringToHex(t) {
    for (var e = "", a = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"), n = 0; n < t.length; n++) e += a[t.charCodeAt(n) >> 4] + a[15 & t.charCodeAt(n)];
    return e
}

function hexToString(t) {
    for (var e = "", a = 0; a < t.length; a += 2) e += String.fromCharCode(parseInt(t.substr(a, 2), 16));
    return e
}

const decryptGenerate = generate("1DB76D1DC36882DA394907D0AE2CB7C2", "6B23A2EFBC859B6D8925F8571CDACB3D", "decrypt");
console.log('Decrypted Data : ', decryptGenerate.substring(0, 32));