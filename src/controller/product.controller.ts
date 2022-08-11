import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";

export async function createProductHandler(req: Request<{},{}, CreateProductInput['body']>, res: Response) {
    const userId = res.locals.user._id
    console.log(userId)

    const body = req.body

    const product = await createProduct({...body, user: userId})

    return res.send(product)
}


export async function updateProductHandler(req: Request<UpdateProductInput['params']>, res: Response) {
    const userId = res.locals.user._id
    console.log('updateing')
    const productId = req.params.productId
    console.log(productId)
    const update = req.body
    console.log(update)
    const product = await findProduct({productId})
    console.log(product)

    // product not available
    if (!product){
        return res.sendStatus(404)
    }

    console.log(product.user)
    console.log(userId)
    if(String(product.user) !== userId){
        console.log('forbidden')
        return res.sendStatus(403)
    }

    const updatedProduct = await findAndUpdateProduct({productId}, update, {new:true})

    return res.send(updatedProduct)
}


export async function getProductHandler(req: Request<UpdateProductInput['params']>, res: Response) {
    console.log('getting')
    const productId = req.params.productId
    console.log(productId)
    const product = await findProduct({productId})
    console.log(product)

    if (!product) {
        return res.sendStatus(404)
    }

    return res.send(product)
}

export async function deleteProductHandler(req: Request<UpdateProductInput['params']>, res: Response) {
    const userId = res.locals.user._id

    const productId = req.params.productId
    const update = req.body
    const product = await findProduct({productId})

    if (!product){
        return res.sendStatus(404)
    }

    if(String(product.user) !== userId){
        return res.sendStatus(403)
    }

    await deleteProduct({productId})

    return res.sendStatus(200)
}