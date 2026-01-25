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
