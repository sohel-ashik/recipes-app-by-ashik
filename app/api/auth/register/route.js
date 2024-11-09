import fs from 'fs';
import path from 'path';

export const POST = async (req, res) => {
  try {
    const { email, name, phone, password } = await req.json(); // Await and parse the JSON from the request body

    // Load existing users
    const filePath = path.join(process.cwd(), 'server/data', 'users.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 409,
      });
    }

    const cartList = {};
    // Add new user
    const newUser = { email, name, phone, password, cartList };
    users.push(newUser);

    
    // Write updated data back to JSON file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    
    const token = Buffer.from(`${email}:${password}`).toString('base64');

    return new Response(JSON.stringify({ message: 'User registered successfully',token, user: newUser }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error handling registration:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
};
