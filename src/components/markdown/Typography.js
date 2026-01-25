import Link from 'next/link';

export function H2({ children }) {
  return <h2 className="mt-2 first-of-type:mt-0 mb-4 !text-3xl">{children}</h2>;
}

export function H3({ children }) {
  return <h3 className="mt-0 mb-4 !text-2xl">{children}</h3>;
}

export function H4({ children }) {
  return <h4 className="mt-0 mb-4 !text-xl">{children}</h4>;
}

export function Paragraph({ children }) {
  return <p className="mb-4">{children}</p>;
}

export function UnorderedList({ children }) {
  return <ul className="mb-6 list-disc pl-6">{children}</ul>;
}

export function OrderedList({ children }) {
  return <ul className="mb-6 list-disc pl-6">{children}</ul>;
}

export function ListItem({ children }) {
  return <li className="mb-2">{children}</li>;
}

export function InlineCode({ children }) {
  return <code>{children}</code>;
}

export function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto my-4 rounded-lg p-4 bg-gray-900 text-gray-100">
      {children}
    </pre>
  );
}

export function MarkdownLink({ href, children }) {
  if (!href) return <>{children}</>;

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline underline-offset-2 hover:text-blue-800 visited:hover:text-blue-600 focus:text-blue-800"
        style={{ transition: 'color 0.2s ease-in-out' }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-blue-600 underline underline-offset-2 hover:text-blue-800 visited:hover:text-blue-600 focus:text-blue-800"
      style={{ transition: 'color 0.2s ease-in-out' }}
    >
      {children}
    </Link>
  );
}
