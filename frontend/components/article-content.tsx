"use client"

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './article-table-styles.css'

interface ArticleContentProps {
  content: any
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// Helper function to get full image URL
function getImageUrl(url: string): string {
  if (!url) return ''
  // If already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // If relative path, prepend Strapi URL
  return `${STRAPI_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

// Helper function to check if text is an image URL
function isImageUrl(text: string): boolean {
  if (typeof text !== 'string') return false
  const trimmed = text.trim()
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(trimmed)
}

// Extract clean text from children prop
function getTextFromChildren(children: any): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children.map(child => {
      if (typeof child === 'string') return child
      if (child?.props?.text) return child.props.text
      if (child?.props?.children) return getTextFromChildren(child.props.children)
      return ''
    }).join('')
  }
  if (children?.props?.text) return children.props.text
  if (children?.props?.children) return getTextFromChildren(children.props.children)
  return ''
}

export function ArticleContent({ content }: ArticleContentProps) {
  // Hybrid rendering: supports Markdown (string), HTML (string with tags), and Blocks (array)

  // Check if content is HTML (contains HTML tags)
  if (typeof content === 'string' && /<[^>]+>/.test(content)) {
    // If contains <img> tags, render as raw HTML
    return (
      <div
        className="article-html-content"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          color: '#374151',
          fontFamily: 'Inter, sans-serif'
        }}
      />
    )
  }

  if (typeof content === 'string') {
    // Legacy Markdown format
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 style={{fontSize: '52px', fontWeight: 'bold', marginTop: '30px', marginBottom: '16px', color: '#111827', fontFamily: 'Playfair Display, serif'}} {...props} />,
          h2: ({node, ...props}) => <h2 style={{fontSize: '24px', fontWeight: 'bold', marginTop: '30px', marginBottom: '16px', color: '#111827', fontFamily: 'Inter, sans-serif'}} {...props} />,
          h3: ({node, ...props}) => <h3 style={{fontSize: '20px', fontWeight: 'bold', marginTop: '20px', marginBottom: '12px', color: '#111827', fontFamily: 'Inter, sans-serif'}} {...props} />,
          h4: ({node, ...props}) => <h4 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '20px', marginBottom: '12px', color: '#111827', fontFamily: 'Inter, sans-serif'}} {...props} />,
          h5: ({node, ...props}) => <h5 style={{fontSize: '16px', fontWeight: 'bold', marginTop: '16px', marginBottom: '10px', color: '#111827', fontFamily: 'Inter, sans-serif'}} {...props} />,
          h6: ({node, ...props}) => <h6 style={{fontSize: '14px', fontWeight: 'bold', marginTop: '16px', marginBottom: '10px', color: '#111827', fontFamily: 'Inter, sans-serif'}} {...props} />,
          p: ({node, ...props}) => {
            // Check if paragraph contains only an image URL
            const text = getTextFromChildren(props.children)
            if (isImageUrl(text)) {
              return (
                <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                  <img
                    src={text.trim()}
                    alt="Image from URL"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </div>
              )
            }
            return <p style={{fontSize: '14px', marginBottom: '16px', lineHeight: '1.8', color: '#374151', fontFamily: 'Inter, sans-serif'}} {...props} />
          },
          ul: ({node, ...props}) => <ul style={{fontSize: '14px', marginBottom: '16px', paddingLeft: '24px', listStyleType: 'disc', color: '#374151', fontFamily: 'Inter, sans-serif'}} {...props} />,
          ol: ({node, ...props}) => <ol style={{fontSize: '14px', marginBottom: '16px', paddingLeft: '24px', listStyleType: 'decimal', color: '#374151', fontFamily: 'Inter, sans-serif'}} {...props} />,
          li: ({node, ...props}) => <li style={{fontSize: '14px', marginBottom: '8px', lineHeight: '1.6', fontFamily: 'Inter, sans-serif'}} {...props} />,
          strong: ({node, ...props}) => <strong style={{fontWeight: '600', color: '#111827', fontFamily: 'Inter, sans-serif'}} {...props} />,
          a: ({node, ...props}) => <a style={{fontSize: '14px', color: '#2C6AA8', textDecoration: 'underline', fontFamily: 'Inter, sans-serif'}} {...props} />,
          blockquote: ({node, ...props}) => <blockquote style={{fontSize: '14px', borderLeft: '4px solid #2C6AA8', paddingLeft: '16px', marginTop: '16px', marginBottom: '16px', fontStyle: 'italic', color: '#6B7280', fontFamily: 'Inter, sans-serif'}} {...props} />,
          hr: ({node, ...props}) => <hr style={{marginTop: '32px', marginBottom: '32px', borderColor: '#E5E7EB'}} {...props} />,
          table: ({node, ...props}) => (
            <div className="article-table-wrapper">
              <table className="article-table" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => <thead className="article-thead" {...props} />,
          tbody: ({node, ...props}) => <tbody className="article-tbody" {...props} />,
          tr: ({node, ...props}) => <tr className="article-tr" {...props} />,
          th: ({node, ...props}) => <th className="article-th" {...props} />,
          td: ({node, ...props}) => <td className="article-td" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    )
  }

  // New Blocks format
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }) => {
          const styles = {
            1: { fontSize: '52px', marginTop: '30px', marginBottom: '16px', fontFamily: 'Playfair Display, serif' },
            2: { fontSize: '24px', marginTop: '30px', marginBottom: '16px', fontFamily: 'Inter, sans-serif' },
            3: { fontSize: '20px', marginTop: '20px', marginBottom: '12px', fontFamily: 'Inter, sans-serif' },
            4: { fontSize: '18px', marginTop: '20px', marginBottom: '12px', fontFamily: 'Inter, sans-serif' },
            5: { fontSize: '16px', marginTop: '16px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' },
            6: { fontSize: '14px', marginTop: '16px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' },
          }
          const Tag = `h${level}` as keyof JSX.IntrinsicElements
          const style = styles[level as keyof typeof styles]
          return <Tag style={{ ...style, fontWeight: 'bold', color: '#111827' }}>{children}</Tag>
        },
        paragraph: ({ children }) => {
          // Check if paragraph contains only an image URL
          const text = getTextFromChildren(children)
          if (isImageUrl(text)) {
            return (
              <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                <img
                  src={text.trim()}
                  alt="Image from URL"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
            )
          }
          return <p style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.8', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{children}</p>
        },
        list: ({ children, format }) => {
          if (format === 'ordered') {
            return <ol style={{ fontSize: '14px', marginBottom: '16px', paddingLeft: '24px', listStyleType: 'decimal', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{children}</ol>
          }
          return <ul style={{ fontSize: '14px', marginBottom: '16px', paddingLeft: '24px', listStyleType: 'disc', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{children}</ul>
        },
        'list-item': ({ children }) => (
          <li style={{ fontSize: '14px', marginBottom: '8px', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{children}</li>
        ),
        link: ({ children, url }) => (
          <a href={url} style={{ fontSize: '14px', color: '#2C6AA8', textDecoration: 'underline', fontFamily: 'Inter, sans-serif' }}>{children}</a>
        ),
        quote: ({ children }) => (
          <blockquote style={{ fontSize: '14px', borderLeft: '4px solid #2C6AA8', paddingLeft: '16px', marginTop: '16px', marginBottom: '16px', fontStyle: 'italic', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>{children}</blockquote>
        ),
        code: ({ children }) => (
          <pre style={{ backgroundColor: '#F3F4F6', padding: '16px', borderRadius: '8px', marginTop: '16px', marginBottom: '16px', overflow: 'auto' }}>
            <code style={{ fontFamily: 'monospace', fontSize: '14px', color: '#111827' }}>{children}</code>
          </pre>
        ),
        image: ({ image }) => {
          // Debug: log image structure
          console.log('Image block data:', image)

          // Extract caption - Strapi might return it in different formats
          let captionText = ''
          if (typeof image.caption === 'string') {
            captionText = image.caption
          } else if (Array.isArray(image.caption)) {
            // If caption is an array of blocks, extract text
            captionText = image.caption.map((block: any) => {
              if (block.type === 'text') return block.text
              if (typeof block === 'string') return block
              return ''
            }).join('')
          } else if (image.caption?.text) {
            captionText = image.caption.text
          }

          return (
            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <img
                src={getImageUrl(image.url)}
                alt={image.alternativeText || ''}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              {captionText && (
                <p style={{ marginTop: '8px', fontSize: '0.875em', color: '#6B7280', fontStyle: 'italic', textAlign: 'center' }}>
                  {captionText}
                </p>
              )}
            </div>
          )
        },
      }}
    />
  )
}
