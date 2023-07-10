import Head from 'next/head';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
//import { getAllPosts } from '../lib/test-data';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";
import parse from 'html-react-parser';

export default function Home({ posts,pageData }) {
	//console.log(posts);
	//console.log(pageData);
	
	
	
  return (
    <div className="container">
      <Head>
        <title>Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <h1 className="title">
		
		{parse(pageData.heading)}
        </h1>
		
        <p className="description">
          {pageData.description}
        </p>
		
		{parse(pageData.contactForm7)};
		
        <div className="grid">
          {
            posts.map((post) => {
              return (
                <PostCard key={post.uri} post={post}></PostCard>
              )
            })
          }
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}

export async function getStaticProps(){

  // Paste your GraphQL query inside of a gql tagged template literal
  const GET_POSTS = gql`
    query AllPostsQuery {
      posts {
        nodes {
          title
          content
          date
          uri
        }
      }
    }
  `;
  
  const GET_HOMEPAGE = gql`
	query GetHome {
	  page(id: "29", idType: DATABASE_ID) {
		homeDetails {
		  sliderDetails {
			heading
			description
			contactForm7
			button {
			  url
			  title
			  target
			}
			backgroundImage {
			  altText
			}
		  }
		}
	  }
	}
	`;
  
  // Here we make a call with the client and pass in our query string to the 
  // configuration objects 'query' property
  const response = await client.query({
    query: GET_POSTS
  });
  
   const response2 = await client.query({
    query: GET_HOMEPAGE
  });
  // Once we get the response back, we need to traverse it to pull out the 
  // data we want to pass into the HomePage
  const posts = response?.data?.posts?.nodes;  
  const pageData = response2?.data?.page?.homeDetails?.sliderDetails; 
  
  return {
    props: {
      posts,
	  pageData
    }
  }
}