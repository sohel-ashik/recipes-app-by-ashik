// import fs from 'fs';
// import path from 'path';

import { users } from '@/server/data/users';

// const filePath = path.join(process.cwd(), 'server/data', 'users.json');

// // Utility function to load users data
// const loadCartData = () => {
//   const fileData = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(fileData);
// };


export async function GET(req, res) {
    try {
      // Load cart data from users.
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      const userEmail = searchParams.get('userEmail');
      
      // const users = loadCartData();
  
      // Get cartList from the users data
      const user = users.find(user=>user.email === userEmail);
      if(user && user.cartList[id]){
          return new Response(JSON.stringify({ found : true }), {
            status: 200,
          });
      }else{
        return new Response(JSON.stringify({found: false}), {
            status: 200,
          });
      }
      // Return the cartList
      
    } catch (error) {
      console.error('Error getting cart :', error);
      return new Response(JSON.stringify({found: false}), {
          status: 500,
        });
      //   res.status(500).json({ message: 'Server error' });
    }
  }