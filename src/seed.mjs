import { PrismaClient } from "@prisma/client"
import { encrypt, decrypt } from "./encryptation.mjs"

/* Este pequeño script lo único que hace es crear la información
 * inicial de nuestra base de datos para empezar a utilizarla.
 * 
 * El usuario admin tiene las siguientes credenciales en modo desarrollo :
 * username : admin
 * password : admin
 * Y en modo desarrollo la password se especifica con la variable de entorno: ADMIN_PASSWORD
*/

const prisma = new PrismaClient();
const isProduction = process.env.PRODUCTION || false

async function main() {

	await createRoles()
	await createCountries()
	await createCities()
	await createCategories()
	await createAdmin()

	if(!isProduction) {
		await createCustomers()
		await createSellers()
	}
}

console.log("\x1b[42m", "Connecting Prisma", "\x1b[0m")
await prisma.$connect()
main()
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})
	.finally(() => {
		prisma.$disconnect()
		console.log("\x1b[42m", "Start Data Created", "\x1b[0m")
	})

/* <------------ SEMILLAS ------------>*/

// ROLES
async function createRoles() {
	const role = await prisma.role.findFirst()
	if(!role)
	{
		console.log("\x1b[34m", "Creating roles", "\x1b[0m")
		await prisma.role.create({ data : { id : 1, name : "admin"}})
		await prisma.role.create({ data : { id : 2, name : "customer"}})
		await prisma.role.create({ data : { id : 3, name : "seller"}})
	}
}

// PAÍSES
async function createCountries() {
	const country = await prisma.country.findFirst()
	if(!country)
	{
		console.log("\x1b[34m", "Creating countries", "\x1b[0m")
		await prisma.country.create({ data : { id : 1, name : "Costa Rica", currency : "₡" } })
		await prisma.country.create({ data : { id : 2, name : "México",  currency : "MEX$", } })
		await prisma.country.create({ data : { id : 3, name : "Ecuador",  currency : "$" } })
		await prisma.country.create({ data : { id : 4, name : "Guatemala",  currency : "Q" } })
		await prisma.country.create({ data : { id : 5, name : "Republica Dominicana",  currency : "RD$" } })
	}
}


// CIUDADES Y DISTRITOS
async function createCities() {
	const city = await prisma.city.findFirst()
	if(!city)
	{
		console.log("\x1b[34m", "Creating cities", "\x1b[0m")
		await prisma.city.create({ data : { name : "San José", prefix : "+506", country_id : 1 } })

		await prisma.city.create({ data : { name : "Ciudad de México", prefix : "+52 55", country_id : 2 } })


		await prisma.city.create({ data : { name : "Quito", prefix : "+593", country_id : 3 } })
		await prisma.city.create({ data : { name : "Manchala", prefix : "+593", country_id : 3 } })

		await prisma.city.create({ data : { name : "Ciudad de Guatemala", prefix : "+502", country_id : 4 } })

		await prisma.city.create({ data : { name : "Santo Domingo", prefix : "+1 (809)", country_id : 5 } })
	}
}

async function createCategory(categoryName, subCategoriesData) {
	// Este método sirve para que el método que crea categorías
	// no se vea tan largo
	await prisma.category.create({
		data : {
			name : categoryName,
			subCategories : {
				createMany : {
					data : subCategoriesData
				}
			}
		}
	})
}

// CATEGORÍAS
async function createCategories() {
const category = await prisma.category.findFirst()
	if(!category)
	{
		console.log("\x1b[34m", "Creating categories and sub-categories", "\x1b[0m")

		await createCategory("Tecnología",
			[
				{ name : "Electrodomésticos" },
				{ name : "Computadoras" },
				{ name : "Teléfonos" },
				{ name : "Audiífonos"},
				{ name : "Consolas" }
			]
		)

		await createCategory("Ropa",
			[
				{ name : "Vestidos" },
				{ name : "Jackets" },
				{ name : "Bufandas" },
				{ name : "Pantalones"},
				{ name : "Zapatos" }
			]
		)

		await createCategory("Muebles",
			[
				{ name : "Mesas" },
				{ name : "Sillas" },
				{ name : "Estantes" },
				{ name : "Camas"},
				{ name : "Escritorios" }
			]
		)

		await createCategory("Plantas",
			[
				{ name : "Macetas" },
				{ name : "Semillas" },
				{ name : "Fertilizantes" },
				{ name : "Herramientas"},
				{ name : "Pesticidas" }
			]
		)
	}
}

// ADMIN
async function createAdmin() {
	try {
		await prisma.user.delete({ where : { username : "admin" } })
		console.log("\x1b[34m", "Regenerating admin", "\x1b[0m")
	}
	catch {
		console.log("\x1b[34m", "Creating admin", "\x1b[0m")
	}
	finally {
		const admin = await prisma.user.create({
			data : {
				id : 1,
				username : "admin",
				password : encrypt(process.env.ADMIN_PASSWORD || "admin"),
				email : "admin@leafyshop.com",
				role_id : 1
			}
		})
		console.log("\x1b[44m", `Admin username : ${admin.username}`, "\x1b[0m")
		console.log("\x1b[44m", `Admin password : ${decrypt(admin.password)}`, "\x1b[0m")
	}
}

// CLIENTE
async function createCustomers() {
	const customer = prisma.user.findFirst({ where : { role_id : 2 } })
	if(!customer)
	{
		console.log("\x1b[34m", "Creating customers", "\x1b[0m")
		await prisma.user.create({ 
			data : {
				username : "customer",
				password : encrypt("customer"),
				email : "customer-abcdef@leafyshop.com",
				role_id : 2,
				customer : { create : {
					name : "Fabricio Gonzo Lopez Alvarado",
					alt_email : "customer-ghijkl@leafyshop.com",
					phone : "1234-5678",
					alt_phone : null,
					direcction : "Lugar genérico",
					alt_direction : null,
					tb_code : "1234567890",
					tb_code_type : "dni",
					country_id : 1
				}}
			}
		})
	}
}

// VENDEDORES
async function createSellers() {
	const seller = prisma.user.findFirst({ where : { role_id : 3 } })
	if(!seller)
	{
		console.log("\x1b[34m", "Creating sellers", "\x1b[0m")
		const seller1 = await prisma.user.create({ 
			data : {
				username : "seller1",
				password : encrypt("seller"),
				email : "seller1@leafyshop.com",
				role_id : 3,
				employee : { create : {
					name : "Fernando Contreras Garcia",
					birth_date : new Date().toJSON(),
					country_id : 2,
				}}
			}
		})

		const seller2 = await prisma.user.create({ 
			data : {
				username : "seller2",
				password : encrypt("seller"),
				email : "seller2@leafyshop.com",
				role_id : 3,
				employee : { create : {
					name : "Manuel Picasso Busto",
					birth_date : new Date().toJSON(),
					country_id : 2,
				}}
			}
		})

		console.log("\x1b[34m", "Creating inventories", "\x1b[0m")
		await prisma.inventory.create({
			data : {
				id : 1,
				providers : { connect : { employee_id : seller1.id }}
			}
		})

		await prisma.inventory.create({
			data : {
				id : 2,
				providers : { connect : { employee_id : seller2.id }}
			}
		})
	}
}