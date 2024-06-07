
// add to cart
export async function POST(request) {
    try {
      const { bookId, quantity } = await request.json();
      await connectMongoDB();
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);

      if (!user) {
        return NextResponse.json({ error: 'Please log in or register' }, { status: 404 });
      }

      if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
      }
  
      user.cart.push({ book: book._id, quantity });
      await user.save();
  
      return NextResponse.json({ message: 'Book successfully added to cart' }, { status: 201 });
    } catch (error) {
      console.error('Error adding book to cart:', error);
      return NextResponse.json(
        { error: 'An error occurred while adding the book to the cart' },
        { status: 500 }
      );
    }
  }
  
// remove from cart
export async function DELETE({ params }) {
  try {
    const { bookId } = params;
    await connectMongoDB();
    const user = await User.findById(userId);
    const cartItem = user.cart.find((item) => item.book.toString() === bookId);

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    user.cart.pull(cartItem);
    await user.save();

    return NextResponse.json({ message: 'Book removed from cart' }, { status: 200 });
  } catch (error) {
    console.error('Error removing book from cart:', error);
    return NextResponse.json(
      { error: 'An error occurred while removing the book from the cart' },
      { status: 500 }
    );
  }
}

//view cart
export async function GET() {
    try {
      await connectMongoDB();
      const user = await User.findById(userId).populate('cart.book');
      return NextResponse.json(user.cart, { status: 200 });
    } catch (error) {
      console.error('Error fetching cart:', error);
      return NextResponse.json(
        { error: 'An error occurred while fetching the cart' },
        { status: 500 }
      );
    }
  }
  