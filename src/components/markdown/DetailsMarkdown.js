import ReactMarkdown from 'react-markdown';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkDirective from 'remark-directive';
import remarkImageGrid from '@/util/markdown';
import {
  CodeBlock,
  H2,
  H3,
  H4,
  InlineCode,
  ListItem,
  MarkdownLink,
  OrderedList,
  Paragraph,
  UnorderedList
} from './Typography';
import { ImageGrid, MarkdownImage } from './Media';

const lang = 'en';

function DetailsMarkdown({ data }) {
  if (!data) return <></>;

  return (
    <article className="details-markdown">
      <ReactMarkdown
        rehypePlugins={[
          // Prevent images from being wrapped in a paragraph
          rehypeUnwrapImages
        ]}
        remarkPlugins={[
          remarkDirective,
          // Handle image grids
          remarkImageGrid
        ]}
        components={{
          h1: ({ children }) => (
            // To make sure that the H1 in MD is rendered as H2 in the article
            <H2>{children}</H2>
          ),
          h2: ({ children }) => (
            // To make sure that the H2 in MD is rendered as H3 in the article
            <H3>{children}</H3>
          ),
          h3: ({ children }) => (
            // To make sure that the H3 in MD is rendered as H4 in the article
            <H4>{children}</H4>
          ),
          p: ({ children }) => <Paragraph>{children}</Paragraph>,
          ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
          ol: ({ children }) => <OrderedList>{children}</OrderedList>,
          li: ({ children }) => <ListItem>{children}</ListItem>,
          a: ({ href, children }) => (
            <MarkdownLink href={href}>{children}</MarkdownLink>
          ),
          img: (props) => <MarkdownImage {...props} lang={lang} />,
          imageGrid: (props) => <ImageGrid {...props} />,
          code: ({ inline, className, children }) =>
            inline ? (
              <InlineCode>{children}</InlineCode>
            ) : (
              <code className={className}>{children}</code>
            ),
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>
        }}
        skipHtml
      >
        {data.detail_md}
      </ReactMarkdown>
    </article>
  );
}

export default DetailsMarkdown;
