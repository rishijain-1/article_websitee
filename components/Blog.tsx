'use client';

import { useEffect, useState } from 'react';

interface Post {
  title: { rendered: string };
  link: string;
  excerpt: { rendered: string };
  date: string;
}

const BlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/wordpressPost');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);

        // If the response is not an array, check its structure and access the correct property
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data.posts) { // Adjust according to the API structure
          setPosts(data.posts);
        } else {
          throw new Error('Invalid response structure');
        }
        
      } catch (error) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="w-full mx-auto items-center flex flex-col justify-center p-6 bg-gray-700 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center m-3 text-white">Blog Posts</h1>
      <ul className="space-y-6 max-w-4xl">
        {posts.map((post, index) => (
          <li
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-2xl font-bold text-white hover:underline">
              {post.title.rendered}
            </div>
            <p className="text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <p className="text-sm text-gray-500 mt-4">{new Date(post.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
