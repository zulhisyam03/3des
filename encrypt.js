const CryptoJS = require("crypto-js");

// Fungsi untuk mengenkripsi dataHexa menggunakan 3DES dengan mode ECB dan padding PKCS7
function encrypt3DES(dataHexa, masterKeyHex) {
  // Pastikan panjang kunci master 32 karakter heksadesimal (16 byte)
  masterKeyHex = masterKeyHex.padStart(32, "0").slice(0, 32);

  // Mengonversi kunci master dari heksadesimal ke string
  const masterKeyStr = CryptoJS.enc.Hex.parse(masterKeyHex);

  // Mengonversi dataHexa dari heksadesimal ke string
  const dataStr = CryptoJS.enc.Hex.parse(dataHexa);

  // Melakukan enkripsi menggunakan mode ECB dan padding PKCS7
  const encryptedData = CryptoJS.TripleDES.encrypt(dataStr, masterKeyStr, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Mengonversi hasil enkripsi ke dalam bentuk heksadesimal
  const encryptedHex = encryptedData.ciphertext.toString(CryptoJS.enc.Hex);
  // const encryptedHex = encryptedData.ciphertext;

  // return encryptedHex.slice(0,32).toUpperCase();
  return encryptedHex;
}

// Contoh penggunaan
const dataHexa = "2CE02AFEA151525246EA255D1FF7F732";
const masterKeyHex = "6B23A2EFBC859B6D8925F8571CDACB3D"; // Panjang 32 karakter 2CE02AFEA151525246EA255D1FF7F732

const encryptedData = encrypt3DES(dataHexa, masterKeyHex);
// console.log(CryptoJS.enc.Hex.parse(encryptedData));
console.log("Encrypted Data:", encryptedData);