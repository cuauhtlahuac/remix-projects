const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProduct = () => {
    const name = faker.commerce.productName() + faker.phone.imei();
    return {
        slug: faker.helpers.slugify(name),
        name,
        body: faker.commerce.productDescription(),
        images: [
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl(),
        ],
        color: faker.color.human(),
    }
}

const seed = () => {
    return [...Array(10).keys()].map(getProduct);
}
const seeded = seed();

const saveInDB = async () => await prisma.myProduct.createMany({ data: seeded });

saveInDB().then(() => console.info("DONE!")).catch((error) => console.error("ERROR", error));