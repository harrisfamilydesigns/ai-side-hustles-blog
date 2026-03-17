import { useState } from 'react'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'

export default function Post({ post, contentHtml }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const subscribe = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('https://xeziherrnomjgjzdxltk.supabase.co/rest/v1/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'sb_publishable_WT_DAlRy3lbxj02xS4lzKA_OS59325_',
          'Authorization': 'Bearer sb_publishable_WT_DAlRy3lbxj02xS4lzKA_OS59325_',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email })
      })
      
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="container">
      <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', fontWeight: '600' }}>
        &larr; Back to Home
      </Link>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {/* Newsletter Signup Component */}
      <div className="newsletter-box">
        <h3>Want to build a high-margin AI business?</h3>
        <p>Join 1,000+ others getting actionable blueprints sent directly to their inbox every week. No spam, just pure strategy.</p>
        {status === 'success' ? (
          <p style={{ color: '#16a34a', fontWeight: 'bold' }}>Success! You're on the list.</p>
        ) : (
          <form className="newsletter-form" onSubmit={subscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button type="submit" className="newsletter-button" disabled={status === 'loading'}>
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
           <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>An error occurred. Make sure you entered a valid email or haven't already subscribed.</p>
        )}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content'])
  const processedContent = await remark().use(html).process(post.content)
  const contentHtml = processedContent.toString()
  return { props: { post, contentHtml } }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post) => { return { params: { slug: post.slug } } }),
    fallback: false,
  }
}
