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


//////////////// API
app.get("/products", (req, res) => {
    const { brand, price, search, sort, order } = req.query;
    let filtered = [...productsData];

    if (brand) {
        const brandsArray = brand.split(",");
        filtered = filtered.filter((p) => brandsArray.includes(p.brand));
    }

    if (price === "under") {
        filtered = filtered.filter((p) => p.price < 1000);
    } else if (price === "over") {
        filtered = filtered.filter((p) => p.price >= 1000);
    }

    if (search) {
        filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
        );
    }



    res.json(filtered);
});



////////////////  ADD FRONT
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3001, () => {
    console.log("Server: http://localhost:3001");
});
