import { PrismaClient } from '@prisma/client';
import Logger from '../../utils/Logger';

class ProductService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createProduct(productData) {
        Logger.info('[ProductService]: createProduct service invoked');
        if (productData === null || productData === '') {
            Logger.error(
                '[ProductService]: Null value for productData parameter'
            );
            return null;
        }

        const product = await this.prisma.product.create({
            data: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stockCount: productData.stockCount,
                image: productData.image,
                category: productData.category,
            },
        });
        Logger.info(
            `[ProductService]: Product creation for the product id:${product.id} successful`
        );
        return product;
    }

    async getProduct(productId) {
        Logger.info('[ProductService]: getProduct service invoked');
        if (productId === null || productId === '') {
            Logger.error(
                '[ProductService]: Null value for productId parameter'
            );
            return null;
        }

        const product = await this.prisma.product.findFirst({
            where: { id: productId },
        });

        if (product === null) {
            Logger.error(
                `[ProductService]: Could not find a product with id:${productId}`
            );
        }
        Logger.info(
            `[ProductService]: Data retrieval for the product id:${productId} successful`
        );
        return product;
    }

    async getProducts() {
        Logger.info('[ProductService]: getProducts service invoked');
        const products = await this.prisma.product.findMany();
        Logger.info(
            `[ProductService]: Data retrieval for the products successful with product count:${products.length}`
        );
        return products;
    }
}

export default ProductService;
