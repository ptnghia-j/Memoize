import { getAuthSession } from "@/lib/nextauth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return { userId: session.user.id }
}
 
export const ourFileRouter = {
  collectionImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1} })
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),

  collectionAttachment: f( ["text", "image", "video", "audio", "pdf"])
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),

  flashcardImage: f({ image: { maxFileCount: 1, maxFileSize: "4MB" }})
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;