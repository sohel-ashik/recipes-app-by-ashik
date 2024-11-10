import clientPromise from '@/app/lib/mongodb';
import bcrypt from 'bcrypt';

export const POST = async (req, res) => {
  try {
    const { email, name, phone, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("mealapp");
    const usersCollection = db.collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 409,
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // Defines the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Initialize a cart list (if needed)
    const cartList = {};

    const newUser = { email, name, phone, password: hashedPassword, cartList };

    // Insert the new user into the database
    const result = await usersCollection.insertOne(newUser);
    console.log('User registered:', result);

    // Create a simple token (this should be done in a secure way, e.g., JWT, for production)
    const token = Buffer.from(`${email}:${hashedPassword}`).toString('base64');

    return new Response(JSON.stringify({ message: 'User registered successfully', token, user: newUser }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error handling registration:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
};
