import CryptoJS from "crypto-js";
import { decryption } from "utils/constants";

const key = CryptoJS.enc.Hex.parse(decryption.key);
const iv = CryptoJS.enc.Utf8.parse(decryption.iv);

export const decrypt = ({
  id,
  sessionId,
}: {
  id: string;
  sessionId: string;
}) => {
   const decryptSessionId = CryptoJS.AES.decrypt(sessionId, key, {
      iv,
      mode: CryptoJS.mode.CBC,
     }).toString(CryptoJS.enc.Utf8);

     const decryptId = CryptoJS.AES.decrypt(id, key, {
      iv,
      mode: CryptoJS.mode.CBC,
     }).toString(CryptoJS.enc.Utf8);
  return { decryptId, decryptSessionId };
};
