const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


mongoose.connect("mongodb://localhost:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connnected successfully");
}).catch((err) => {
    console.log(err);
})


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());


PORT = 8000;


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});


const Product = new mongoose.model("Product", productSchema);


// Create product
app.post("/api/v1/product/new", async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});


// Read product
app.get("/api/v1/products", async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
});


// Update product
app.put("/api/v1/product/:id", async (req, res) => {
    let product = await Product.findById(req.params.id)

    if(!product)
        res.status(500).json({
            success: false,
            Message: "Product not found"
        })

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true
    });
    res.status(500).json({
        success: true,
        product
    })
});


// Delete product
app.delete("/api/v1/product/:id", async (req, res) => {
    let product = await Product.findById(req.params.id)

    if(!product)
        res.status(500).json({
            success: false,
            Message: "Product not found"
        })

    await Product.remove
    res.status(200).json({
        success: true,
        Message: "Product deleted successfully"
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});