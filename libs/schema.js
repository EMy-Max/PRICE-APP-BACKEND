import { z } from "zod";
export const bookSchema = z.object({
  title: z.string().min(3, "Please input Book Title"),
  author: z.string().min(3, "Please input Book Author"),
  aboutAuthor: z.string().min(3, "Write about author(s)"),
  aboutBook: z.string().min(3, "Write about book"),
  imageUrl: z.string().min(10, "Click to Upload book cover"),
  pfdUrl: z.string().min(10, "Click to Upload Book"),
  category: z.string().min(3, "Please select a category"),
  edition: z.string().min(3, "Please put book edition"),
  isFree: z.string().min(2, "Is the book free?"),
  price: z.string().optional(),
  releaseYear: z.string().min(3, "Which year was book released"),
});