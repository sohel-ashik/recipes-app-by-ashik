// import fs from 'fs';
// import path from 'path';

import { users} from '@/server/data/users';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Load existing users
    // const filePath = path.join(process.cwd(), 'server/data', 'users.json');
    // const fileData = fs.readFileSync(filePath, 'utf-8');
    // const users = JSON.parse(fileData);

    // Find the user
    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // Generate a simple token
    const token = Buffer.from(`${email}:${password}`).toString('base64');
    return new Response(JSON.stringify({ message: 'Login successful', token, user }), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
