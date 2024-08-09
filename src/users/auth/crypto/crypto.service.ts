import { Buffer } from "node:buffer"
import { createCipheriv, scryptSync, createDecipheriv } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
	constructor(private config : ConfigService) {}

	encrypt(password : string) : string {
		const encryptKey = scryptSync(this.key, this.salt, 32);
		const iv = Buffer.alloc(16, 0)
		const cipher = createCipheriv(this.algorithm, encryptKey, iv)

		const passwordEncrypted = Buffer.concat([
			cipher.update(password),
			cipher.final()
		])

		return passwordEncrypted.toString(this.passEncryptedFormat)
	}

	decrypt(password : string) : string {
		const encryptKey = scryptSync(this.key, this.salt, 32);
		const iv = Buffer.alloc(16, 0)
		const decipher = createDecipheriv(this.algorithm, encryptKey, iv)

		const passwordDecrypted = Buffer.concat([
			decipher.update(password, this.passEncryptedFormat),
			decipher.final()
		])

		return passwordDecrypted.toString(this.passFormat)
	}

	private key : string = this.config.get<string>("ENCRYPT_KEY") || "SECRET"
	private salt : string = this.config.get<string>("ENCRYPT_SALT") || "SECRET"
	private algorithm : string = this.config.get<string>("ENCRYPT_TYPE")
	private passFormat : BufferEncoding = "utf-8"
	private passEncryptedFormat : BufferEncoding = "hex"
}