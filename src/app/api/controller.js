// app/api/Patient/controller.js

// Example database connection
import { query } from '../lib/db';

export async function createItem(relevantValues, keys, table, TOSLICE) {
    try {
      const placeholders = Array(TOSLICE).fill('?').join(', ');
      // Construct and execute the SQL query
      const result = await query({
        query: `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`,
        values: relevantValues,
      });
      // Return the newly created item
      return { id: result.insertId, ...relevantValues };
    } catch (error) {
      console.log('ERROR', error);
      throw new Error(`Failed to create ${table}`);
    }
  }
  
export async function getAllItems(table) {
  try {
    // Perform database query to retrieve all items from the specified table
    const result = await query({
      query: `SELECT * FROM ${table}`
    });

    // Return the array of items
    return result;
  } catch (error) {
    throw new Error(`Failed to get all items from ${table}`);
  }
}
  
// Function to get an item by ID
export async function getItem(itemId, table) {
    try {
      // Perform database query to retrieve item by ID
      const result = await query({
        query: `SELECT * FROM ${table} WHERE id = ?`,
        values: [itemId]
      });
  
      // Check if item exists
      if (result.length === 0) {
        return null; // Item not found
      }
  
      // Return the item
      return result[0];
    } catch (error) {
      throw new Error(`Failed to get ${table}`);
    }
  }
  
  // Function to update an item by ID
  export async function updateItem(itemId, itemData, table) {
    try {
      // Construct the SET part of the SQL query
      const setClause = Object.keys(itemData).map(key => `${key} = ?`).join(', ');
      // Get the values for the SET part
      const values = Object.values(itemData);
      // Perform database query to update item by ID
      await query({
        query: `UPDATE ${table} SET ${setClause} WHERE ${table}ID = ?`,
        values: [...values, itemId]
      });
  
      // Return the updated item
      return { id: itemId, ...itemData };
    } catch (error) {
      console.log(Error, error);
      throw new Error(`Failed to update ${table}`);
    }
  }
  
  // Function to delete an item by ID
  export async function deleteItem(itemId, table) {
    try {
      // Perform database query to delete item by ID
      await query({
        query: `DELETE FROM ${table} WHERE PatientID = ?`,
        values: [itemId]
      });
    } catch (error) {
      throw new Error(`Failed to delete ${table}`);
    }
  }
  