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