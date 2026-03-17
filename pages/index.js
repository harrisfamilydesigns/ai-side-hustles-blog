import Link from 'next/link'
import { getAllPosts } from '../lib/api'

export default function Index({ allPosts }) {
  return (
    <div className="container">
      <h1 style={{ fontSize: '3rem', color: '#111827', textAlign: 'center' }}>AI-Powered Side Hustles 💰</h1>
      <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '1.2rem', marginBottom: '3rem' }}>Mining for profitable niches, block by block.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {allPosts.map((post) => (
          <div key={post.slug} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#f9fafb' }}>
            <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.5rem', color: '#2563eb', fontWeight: 'bold' }}>
              {post.title}
            </Link>
            <br/>
            <span className="meta" style={{ marginTop: '0.5rem', marginBottom: '0' }}>Published on {post.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug'])
  return { props: { allPosts } }
}
