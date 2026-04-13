import { getDBConnection } from "../db/db.js";

export async function getGenres(req, res) {
  try {
    const db = await getDBConnection();
    const genreRows = await db.all("SELECT DISTINCT genre FROM products");
    const genres = genreRows.map((row) => row.genre);
    res.json(genres);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch genres", details: err.message });
  }
}

export async function getProducts(req, res) {
  try {
    const db = await getDBConnection();
    const { search, genre } = req.query;

    let query = "SELECT * FROM products";
    const params = [];

    if (search) {
      query += " WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (genre) {
      query += search ? " AND genre = ?" : " WHERE genre = ?";
      params.push(genre);
    }

    const products = await db.all(query, params);
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: err.message });
  }
}
