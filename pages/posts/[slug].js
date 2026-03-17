import { getPostBySlug, getAllPosts } from '../../lib/api'
import { remark } from 'remark'
import html from 'remark-html'

export default function Post({ post, contentHtml }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', padding: '2rem', lineHeight: '1.6' }}>
      <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>&larr; Back to Home</a>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
