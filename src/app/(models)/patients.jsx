import mysql from 'mysql';

export async function query({ query, values = [] }) {
  // PlanetScale;
  const dbconnection = await mysql.createConnection(
    process.env.MYSQL_DATABASE_URL
  );
  
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}