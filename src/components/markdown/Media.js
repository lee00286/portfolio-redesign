import Image from 'next/image';

export function MarkdownImage({ src, alt, lang }) {
  if (!src) return <></>;

  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt ?? (lang === 'ko' ? '' : '')}
        width={1200}
        height={800}
        className="rounded-lg border w-full object-contain"
      />
      {alt && (
        <figcaption className="mt-2 text-sm text-gray-500 text-center">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
