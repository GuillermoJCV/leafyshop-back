import { JWT_SECRET_TEST } from "src/constants/SECRETS";

export default () => ({
	jwt_secret : process.env.SECRET || JWT_SECRET_TEST,
	port : process.env.PORT || 2999,
	database : {
		host : process.env.DATABASE_HOST,
		port : process.env.DATABASE_PORT
	}
})