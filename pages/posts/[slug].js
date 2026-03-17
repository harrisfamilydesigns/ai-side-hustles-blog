import { getPostBySlug, getAllPosts } from '../../lib/api'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'

export default function Post({ post, contentHtml }) {
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
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="newsletter-input" 
            required 
          />
          <button type="submit" className="newsletter-button">
            Subscribe
          </button>
        </form>
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
