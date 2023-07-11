import Head from 'next/head';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
//import { getAllPosts } from '../lib/test-data';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";
import parse from 'html-react-parser';

export default function Home({ posts,pageData,Form }) {
	//console.log(posts);
	//console.log(pageData);
	const stripHtml = (string) => string.replace(/(<([^>]+)>)/gi, "");
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		
		/*const data = {
		  somebodysname: event.target.somebodys_name.value,
		  any_email: event.target.any_email.value,
		  before_space_age: event.target.before_space_age.value,
		  optional_message: event.target.optional_message.value
		}*/
		const data = new FormData(event);


		const JSONdata = JSON.stringify(data);
		console.log(JSONdata);
		/*/// API endpoint where we send form data.
		const endpoint = 'https://cssformsrestapi.tastewp.com/wp-json/contact-form-7/v1/contact-forms/5/feedback'
	 
		// Form the request for sending data to the server.
		const options = {
		  // The method is POST because we are sending data.
		  method: 'POST',
		  // Tell the server we're sending JSON.
		  headers: {
			'Content-Type': 'application/json',
		  },
		  // Body of the request is the JSON data we created above.
		  body: JSONdata,
		}
	 
		// Send the form data to our forms API on Vercel and get a response.
		const response = await fetch(endpoint, options)
	 
		// Get the response data from server as JSON.
		// If server returns the name submitted, that means the form works.
		const result = await response.json()
		alert(`Is this your full name: ${result.data}`) */

	}

	
	
	
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
		<form  onSubmit={handleSubmit} method="post" >


                <div className="form-group">
                    <label className="form-label" htmlFor="somebodys-name">Somebody's name</label>
                    <input className="form-input" id="somebodys_name" type="text" name="somebodys-name" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="any-email">Any valid email address</label>
                  
                    <input className="form-input" id="any_email" type="text" name="any-email" />
                </div>

                <div className="form-group">
                  
                    <label className="form-label" htmlFor="before-space-age">A date before the Space Age</label>
                    <input className="form-input col-8" id="before_space_age" type="date" placeholder="yyyy-mm-dd" name="before-space-age" />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="optional-message">Optional message to the world</label>
                    <textarea className="form-input" id="optional_message" name="optional-message"></textarea>
                </div>

              
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

            </form>
        <p className="description">
          {pageData.description}
        </p>
		
		
		
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