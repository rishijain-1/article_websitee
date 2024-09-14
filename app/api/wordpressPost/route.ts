
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const res = await fetch('https://blog.getgrahak.co/wp-json/wp/v2/posts?per_page=5');
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    

      const post = await res.json();

      return new NextResponse(JSON.stringify(post));
   
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response('Error fetching posts: ' + (error as Error).message, { status: 500 });
  }
}
