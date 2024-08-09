import { Buffer } from "node:buffer"
import crypto from "node:crypto"

const key = process.env.ENCRYPT_KEY || "SECRET"
const salt = process.env.ENCRYPT_SALT || "SECRET"

const passwordFormat = "utf-8"
const passwordEncryptedFormat = "hex"

const encryptKey = crypto.scryptSync(key, salt, 32);
const iv = Buffer.alloc(16, 0)

const algorithm = process.env.ENCRYPT_TYPE || ""

const encrypt = (password = "") => {
	const cipher = crypto.createCipheriv(algorithm, encryptKey, iv)
	const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()])

	return encryptedPassword.toString(passwordEncryptedFormat)
}

const decrypt = (passwordEncrypted = "") => {
	const decipher = crypto.createDecipheriv(algorithm, encryptKey, iv)
	/*
	let decryptedPassword = decipher.update(passwordEncrypted, passwordEncryptedFormat, passwordFormat)
	decryptedPassword += decipher.final();
*/
	const decryptedPassword = Buffer.concat([
		decipher.update(passwordEncrypted, passwordEncryptedFormat),
		decipher.final()
	])

	return decryptedPassword.toString(passwordFormat)
}

export {
	encrypt,
	decrypt
}