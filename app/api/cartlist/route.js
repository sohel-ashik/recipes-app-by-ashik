import clientPromise from '@/app/lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');

    const client = await clientPromise;
    const db = client.db("mealapp");
    const usersCollection = db.collection("users");

    // Find the user by email and get their cartList
    const user = await usersCollection.findOne({ email: userEmail });
    const cartList = user?.cartList || {};

    return new Response(JSON.stringify({ message: 'Cart list data', cartList }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error getting cart list:', error);
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { id, userEmail, data } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: 'Item and ID are required' }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("mealapp");
    const usersCollection = db.collection("users");

    // Update the user's cart list by adding/updating the item
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { [`cartList.${id}`]: data } }
    );

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

export async function DELETE(req) {
  try {
    const { userEmail, id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: 'Item ID is required' }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("mealapp");
    const usersCollection = db.collection("users");

    // Remove the item from the user's cart list
    await usersCollection.updateOne(
      { email: userEmail },
      { $unset: { [`cartList.${id}`]: "" } }
    );

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
