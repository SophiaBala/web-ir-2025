import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import productsData from "./src/data.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

//////////////// API
app.get("/api/products", (req, res) => {
    const { brand, price, search } = req.query;
    let filtered = [...productsData];

    if (brand) {
        const brandsArray = brand.split(",");
        filtered = filtered.filter((p) => brandsArray.includes(p.brand));
    }

    if (price === "under") filtered = filtered.filter((p) => p.price < 1000);
    else if (price === "over") filtered = filtered.filter((p) => p.price >= 1000);

    if (search)
        filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
        );

    res.json(filtered);
});

//////////////////////////КОРЗИНА
app.get("/api/cart", (req, res) => {
    res.json(cart);
});

app.post("/api/cart/add", (req, res) => {
    const { id, name, price } = req.body;
    const existingItem = cart.items.find((i) => i.id === id);

    if (existingItem) existingItem.quantity += 1;
    else cart.items.push({ id, name, price, quantity: 1 });

    cart.totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    res.json(cart);
});

app.post("/api/cart/remove", (req, res) => {
    const { id } = req.body;
    cart.items = cart.items.filter((i) => i.id !== id);
    cart.totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    res.json(cart);
});


app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
