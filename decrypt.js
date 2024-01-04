const CryptoJS = require("crypto-js");

function decrypt3DES(dataHexa, masterKeyHex) {
  // Pastikan panjang kunci master 32 karakter heksadesimal (16 byte)
  masterKeyHex = masterKeyHex.padStart(32, "0").slice(0, 32);

  // Mengonversi kunci master dari heksadesimal ke string
  const masterKeyStr = CryptoJS.enc.Hex.parse(masterKeyHex);

  // Mengonversi hasil enkripsi dari heksadesimal ke string
  const encryptedData = CryptoJS.enc.Hex.parse(dataHexa);

  console.log(
    "Master Key:",
    masterKeyStr.toString(CryptoJS.enc.Hex).toUpperCase()
  );

  // Melakukan dekripsi menggunakan mode ECB dan padding PKCS7
  try {
    const decryptedData = CryptoJS.TripleDES.decrypt(
      { ciphertext: encryptedData },
      masterKeyStr,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // Mengonversi hasil dekripsi ke dalam bentuk Hex
    const decryptedText = CryptoJS.enc.Hex.stringify(decryptedData);

    // Menghitung panjang bytes yang valid (tanpa padding)
    const validBytes = decryptedData.sigBytes;

    // Menghitung panjang padding yang diterapkan
    const paddingLength = 16 - (validBytes % 16);

    // Memotong data sehingga hanya menyisakan panjang pesan asli
    const finalDecryptedText = decryptedText.substring(0, decryptedText.length - 2 * paddingLength);

    console.log("Decrypted Data:", finalDecryptedText);
    console.log("Valid Bytes Length:", validBytes);

    return finalDecryptedText;
  } catch (error) {
    console.error("Error during decryption:", error.message);
    return error.message;
  }
}

// Contoh penggunaan
const dataHexa = "1db76d1dc36882da394907d0ae2cb7c2";
const masterKeyHex = "6B23A2EFBC859B6D8925F8571CDACB3D";

const decryptedData = decrypt3DES(dataHexa, masterKeyHex);
console.log("Decrypted Data:", decryptedData);
