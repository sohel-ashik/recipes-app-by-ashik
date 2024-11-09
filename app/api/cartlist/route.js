import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'server/data', 'users.json');

// Utility function to load users data
const loadCartData = () => {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
};

// Utility function to save cart data
const saveCartData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET(req, res) {
  try {
    // Load cart data from users.
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    
    const users = loadCartData();

    // Get cartList from the users data
    const user = users.find(user=>user.email === userEmail);
    let cartList = {};
    if(user){
        cartList = user.cartList;
    }
    // Return the cartList
    return new Response(JSON.stringify({ message: 'Cart list data', cartList }), {
        status: 200,
      });
  } catch (error) {
    console.error('Error getting cart list:', error);
    return new Response(JSON.stringify({ message: 'Server Error' }), {
        status: 500,
      });
    //   res.status(500).json({ message: 'Server error' });
  }
}

export async function POST(req) {
    try {
      const { id, userEmail, data } = await req.json();
      console.log(data);
  
      if (!id) {
        return new Response(JSON.stringify({ message: 'Item and ID are required' }), {
          status: 400,
        });
      }
  
      // Load existing users data
      const users = loadCartData();
  
      // Find the user and update their cartList
      users.forEach(user => {
        if (user.email === userEmail) {
          // Initialize cartList if it doesn't exist
          if (!user.cartList) user.cartList = {};
          user.cartList[id] = data;
        }
      });
  
      // Save the updated data back to the JSON file
      saveCartData(users);
  
      return new Response(JSON.stringify({ message: 'Item added' }), {
        status: 201,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return new Response(JSON.stringify({ message: 'Server Error' }), {
        status: 500,
      });
    }
  }
  

export async function DELETE(req, res) {
  try {
    const {userEmail, id } = await req.json();

    if (!id) {
        return new Response(JSON.stringify({ message: 'Item ID is required' }), {
            status: 400,
          });
    //   return res.status(400).json({ message: 'Item ID is required' });
    }
    // Load existing users data

    // Check if cartList exists and the item is in the cart
    const users = loadCartData();
  
      // Find the user and update their cartList
    users.forEach(user => {
    if (user.email === userEmail) {
        // Initialize cartList if it doesn't exist
        if (!user.cartList) user.cartList = {};
        delete user.cartList[id]
    }
    });

    // Save the updated data back to the JSON file
    saveCartData(users);

    return new Response(JSON.stringify({ message: 'Item removed' }), {
        status: 200,
      });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    return new Response(JSON.stringify({ message: 'Server Error' }), {
        status: 500,
      });
  }
}
