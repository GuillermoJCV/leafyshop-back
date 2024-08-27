import { PrismaClient } from "@prisma/client"
import { encrypt } from "./encryptation.mjs"

const prisma = new PrismaClient();
const isProduction = Boolean(process.env.PRODUCTION)

async function main() {
	await prisma.$connect()

	const role = await prisma.role.findFirst()
	if(!role) {
		console.log("Creating roles")
		await prisma.role.create({ data : { id : 1, name : "admin"}})
		await prisma.role.create({ data : { id : 2, name : "customer"}})
		await prisma.role.create({ data : { id : 3, name : "seller"}})
	}

	const country = await prisma.country.findFirst()
	if(!country) {
		console.log("Creating countries")
		await prisma.country.create({ data : { id : 1, name : "Costa Rica", currency : "₡" } })
		await prisma.country.create({ data : { id : 2, name : "México",  currency : "MEX$", } })
		await prisma.country.create({ data : { id : 3, name : "Ecuador",  currency : "$" } })
		await prisma.country.create({ data : { id : 4, name : "Guatemala",  currency : "Q" } })
		await prisma.country.create({ data : { id : 5, name : "Republica Dominicana",  currency : "RD$" } })
	}

	const city = await prisma.city.findFirst()
	if(!city) {
		console.log("Creating cities")
		await prisma.city.create({ data : { name : "San José", prefix : "+506", country_id : 1 } })

		await prisma.city.create({ data : { name : "Ciudad de México", prefix : "+52 55", country_id : 2 } })


		await prisma.city.create({ data : { name : "Quito", prefix : "+593", country_id : 3 } })
		await prisma.city.create({ data : { name : "Manchala", prefix : "+593", country_id : 3 } })

		await prisma.city.create({ data : { name : "Ciudad de Guatemala", prefix : "+502", country_id : 4 } })

		await prisma.city.create({ data : { name : "Santo Domingo", prefix : "+1 (809)", country_id : 5 } })
	}

	await prisma.user.deleteMany({ where : { username : "admin" }})
	console.log("Creating users")
	await prisma.user.create({ 
		data : {
			id : 1,
			username : "admin",
			password : encrypt(process.env.ADMIN_PASSWORD || "admin"),
			email : "admin@leafyshop.com",
			role_id : 1
		}
	})
}

main()
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})
	.finally(() => {
		prisma.$disconnect()
		console.log("Start info created")
	})

