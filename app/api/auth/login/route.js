import clientPromise from '@/app/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("mealapp");
    const usersCollection = db.collection("users");

    // Check if user exists by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // Generate token (for example, using email and password, this should be more secure in production, e.g., JWT)
    const token = Buffer.from(`${email}:${password}`).toString('base64');

    return new Response(JSON.stringify({ message: 'Login successful', token, user }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
