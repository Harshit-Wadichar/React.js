import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                     featuredimage: featuredImage, // 🔴 FIXED KEY,
                    status,
                    userid: userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                     featuredimage: featuredImage, // 🔴 FIXED KEY
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
         try {
    const doc = await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug
    );
    // map Appwrite’s lowercase → your camelCase props:
    return {
      ...doc,
      featuredImage: doc.featuredimage,
      userId:         doc.userid,
      // leave content as-is (once you’ve bumped its type to Text in the console)
    };
  } catch (error) {
    console.log("Appwrite service :: getPost :: error", error);
    return null;
  }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
       try {
    const res = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries,
    );
    return {
      ...res,
      documents: res.documents.map(doc => ({
        ...doc,
        featuredImage: doc.featuredimage,  // map lowercase → camelCase
        userId:         doc.userid,
      })),
    };
  } catch (error) {
    console.log("Appwrite service :: getPosts :: error", error);
    return false;
  }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

   getFileView(fileId) {
  return this.bucket.getFileView(
    conf.appwriteBucketId,
    fileId
  );
}
}


const service = new Service()
export default service