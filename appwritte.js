import { Client, Databases, Query, ID } from "appwrite";

const projectId = import.meta.env.VITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectId);

const database = new Databases(client);
// sending to the data
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await database.listDocuments(
      databaseId,
      collectionId,
      [
        Query.equal("searchTerm", searchTerm)
      ]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(
        databaseId,
        collectionId,
        doc.$id,
        {
          count: doc.count + 1,
        }
      );
    } else {
      await database.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.error("Failed to update search count:", error);
  }
};

// Getting trending movies
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(
      databaseId,
      collectionId,
      [
        Query.limit(5),
        Query.orderDesc("count"),
      ]
    );

    return result.documents;
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    return [];
  }
};