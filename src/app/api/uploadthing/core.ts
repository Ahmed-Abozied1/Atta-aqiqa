import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "@/lib/get-session";

const f = createUploadthing();

export const ourFileRouter = {
  profileImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession();
      
      if (!session?.user) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed for user:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
      
      return { 
        uploadedBy: metadata.userId,
        url: file.ufsUrl 
      };
    }),

  productImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getServerSession();
      
      if (!session?.user || session.user.role !== "ADMIN") {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product image uploaded by admin:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
      
      return { 
        uploadedBy: metadata.userId,
        url: file.ufsUrl 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;