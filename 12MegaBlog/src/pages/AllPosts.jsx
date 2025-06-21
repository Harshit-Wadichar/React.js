import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // define an async fetch function
    const fetchPosts = async () => {
      try {
        // pass [] to get all posts, or [Query.equal("status","active")] to filter
        const result = await appwriteService.getPosts([]);
         console.log("🔥 getPosts returned:", result.documents);
        if (result && result.documents) {
          setPosts(result.documents);
        }
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    fetchPosts();
  }, []); // <-- run once on mount

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
