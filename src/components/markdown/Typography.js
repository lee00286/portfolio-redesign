import Link from 'next/link';

export function H2({ children }) {
  return <h2 className="mt-2 first-of-type:mt-0 mb-4 !text-2xl">{children}</h2>;
}

export function H3({ children }) {
  return <h3 className="mt-0 mb-3 !text-xl">{children}</h3>;
}

export function H4({ children }) {
  return <h4 className="mt-0 mb-3 !text-lg">{children}</h4>;
}

export function Paragraph({ children }) {
  return <p className="mb-4 !text-gray-700">{children}</p>;
}

export function UnorderedList({ children }) {
  return <ul className="mb-5 list-disc pl-6 !text-gray-700">{children}</ul>;
}

export function OrderedList({ children }) {
  return <ol className="mb-5 list-decimal pl-6 !text-gray-700">{children}</ol>;
}

export function ListItem({ children }) {
  return <li className="mb-1.5">{children}</li>;
}

export function InlineCode({ children }) {
  return <code>{children}</code>;
}

export function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto my-4 rounded-lg p-4 bg-gray-900 text-gray-100 text-sm">
      {children}
    </pre>
  );
}

export function MarkdownLink({ href, children }) {
  if (!href) return <>{children}</>;

  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const linkClass =
    'text-primary-700 underline underline-offset-2 hover:text-primary-900 focus:text-primary-900';

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        style={{ transition: 'color 0.15s ease' }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClass}
      style={{ transition: 'color 0.15s ease' }}
    >
      {children}
    </Link>
  );
}
