
//Checkout (Process Purchase)
export async function POST(request) {
    try {
      await connectMongoDB();
      const user = await User.findById(userId).populate('cart.book');
      const purchase = new Purchase({
        user: user._id,
        items: user.cart,
        total: user.cart.reduce((total, item) => total + item.book.price * item.quantity, 0),
      });
      await purchase.save();
      user.cart = [];
      await user.save();
      return NextResponse.json({ message: 'Purchase successful' }, { status: 201 });
    } catch (error) {
      console.error('Error processing purchase:', error);
      return NextResponse.json(
        { error: 'An error occurred while processing the purchase' },
        { status: 500 }
      );
    }
  }

  //View Purchase History
export async function GET(request) {
  try {
    await connectMongoDB();
    const purchases = await Purchase.find({ user: userId }).populate('items.book');
    return NextResponse.json(purchases, { status: 200 });
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the purchase history' },
      { status: 500 }
    );
  }
}
