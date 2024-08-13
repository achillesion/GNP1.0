import * as crypto from 'node:crypto';
import { CRYPTO_ENCRYPTION } from '../constants/env.constant';

const ALGORITHM = 'aes-256-cbc';
const RANDOM_BYTES = 16;

export class CryptoUtil {
  public static encrypt(text: string): string {
    const iv = crypto.randomBytes(RANDOM_BYTES);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(CRYPTO_ENCRYPTION),
      iv,
    );

    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  public static decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(CRYPTO_ENCRYPTION),
      iv,
    );

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  public static generateUUID() {
    return crypto.randomUUID();
  }
}
