import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModels.js"




export const getProducts = async (req, res) => {
    try {
        const product = await Product.find().populate({path: 'owner', select: 'first_name user_name email'});
        res.status(200).json({product})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getProduct = async (req, res) => {
    const {_id} = req.params;
    try {
        const products = await Product.findById(_id)
        res.status(200).json({products})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getMyProduct = async (req, res) => {
    const {_id} = req.user;
    try {
        const products = await Product.find({owner: _id}).populate({path: 'owner', select: 'first_name user_name email'})
        res.status(200).json({products})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


export const createProduct = async (req, res) => {
    const {_id} = req.user
    const { name, description, price, category} = req.body
    
    
        if (!name || !description || !price || !category ) {
            return res.status(400).json({error: "All feilds Required"})
        }
        if(!req.file) {
            return res.status(400).json({error: "Image is required"})
        }

        const image = req.file.path
        
        try {
            const img = await cloudinary.uploader.upload(image)
        const product = await Product.create({name, description, price, image:img.secure_url, imageId: img.public_id, category, owner: _id })
        res.status(201).json({product})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const editProduct = async (req, res) => {
    const {_id} = req.params;
    const { name, description, price, category } = req.body;
    const image = req.file.path

    try {
        const product = await Product.findById(_id);
        if(req.file) {

        await cloudinary.uploader.destroy(product.imageId);

        const img = await cloudinary.uploader.upload(image);

        const editProduct = await Product.findByIdAndUpdate(_id, {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            image: image.secure_url,
            imageId: img.public_id,
        }, { new: true});

            res.status(200).json(editProduct)

        }else{
            const editProduct = await Product.findByIdAndUpdate(_id, {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
            }, {new: true});
            res.status(200).json(editProduct)
        }

        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
} 