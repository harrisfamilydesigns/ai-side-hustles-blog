import Link from 'next/link'
import { getAllPosts } from '../lib/api'

export default function Index({ allPosts }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>AI-Powered Side Hustles 💰</h1>
      <p>Mining for profitable niches, block by block.</p>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1rem' }}>
            <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.2rem', color: '#0070f3', textDecoration: 'none' }}>
              {post.title}
            </Link>
            <br/>
            <small>{post.date}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug'])
  return { props: { allPosts } }
}
