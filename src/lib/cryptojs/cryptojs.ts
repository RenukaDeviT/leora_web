import CryptoJS, { AES } from "crypto-js";
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
  console.log(key, iv, AES);
  return { id, sessionId };
};
