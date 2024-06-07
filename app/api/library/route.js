
// add to library
export async function POST(request) {
    try {
      const { bookId } = await request.json();
  
      if (!bookId) {
        return NextResponse.json({ message: "Book ID is required" }, { status: 400 });
      }
  
      await connectMongoDB();
      const book = await Book.findById(bookId);
  
      if (!book) {
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      if (!book.isFree) {
        // Check if the user has paid for the book
        const payment = await Payment.findOne({
          user: user._id,
          book: book._id,
          paid: true,
        });
  
        if (!payment) {
          return NextResponse.json(
            { message: "You need to purchase this book before adding it to your library" },
            { status: 403 }
          );
        }
      }
  
      user.library.push(bookId);
      await user.save();
  
      return NextResponse.json({ message: "Book added to library" }, { status: 201 });
    } catch (error) {
      console.error("Error adding book to library:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  

  //view library
  export async function GET(request) {
    try {
      await connectMongoDB();
      const user = await User.findById(userId).populate('library');
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(user.library, { status: 200 });
    } catch (error) {
      console.error("Error fetching library:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  