import clientPromise from '@/app/lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userEmail = searchParams.get('userEmail');

    const client = await clientPromise;
    const db = client.db("mealapp");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne(
      { email: userEmail, [`cartList.${id}`]: { $exists: true } }
    );

    if (user) {
      return new Response(JSON.stringify({ found: true }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ found: false }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error getting cart:', error);
    return new Response(JSON.stringify({ found: false }), {
      status: 500,
    });
  }
}
