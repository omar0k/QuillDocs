import { Pinecone } from "@pinecone-database/pinecone";
export const PineconeClient = new Pinecone({
  environment: "gcp-starter",
  apiKey: process.env.PINECONE_API_KEY!,
});
