import {query} from '../../lib/db';
import { NextResponse } from 'next/server';


export default async function GET(req, res){
    if (req.method === "GET") {
      const patients = await query({
        query: "SELECT * FROM patient",
        values: [],
      });
      res.status(200).json({ patients: patients });
    }
  }

// export default async function handler(req, res) {
//   let message;
 

//   if (req.method === "POST") {
//     const productName = req.body.product_name;
//     const addProducts = await query({
//       query: "INSERT INTO products (product_name) VALUES (?)",
//       values: [productName],
//     });
//     let product = [];
//     if (addProducts.insertId) {
//       message = "success";
//     } else {
//       message = "error";
//     }
//     product = {
//       product_id: addProducts.insertId,
//       product_name: productName,
//     };
//     res.status(200).json({ response: { message: message, product: product } });
//   }

//   if (req.method === "PUT") {
//     const productId = req.body.product_id;
//     const productName = req.body.product_name;
//     const updateProducts = await query({
//       query: "UPDATE products SET product_name = ? WHERE product_id = ?",
//       values: [productName, productId],
//     });
//     const result = updateProducts.affectedRows;
//     if (result) {
//       message = "success";
//     } else {
//       message = "error";
//     }
//     const product = {
//       product_id: productId,
//       product_name: productName,
//     };
//     res.status(200).json({ response: { message: message, product: product } });
//   }

//   if (req.method === "DELETE") {
//     const productId = req.body.product_id;
//     const deleteProducts = await query({
//       query: "DELETE FROM products WHERE product_id = ?",
//       values: [productId],
//     });
//     const result = deleteProducts.affectedRows;
//     if (result) {
//       message = "success";
//     } else {
//       message = "error";
//     }
//     res
//       .status(200)
//       .json({ response: { message: message, product_id: productId } });
//   }
// }