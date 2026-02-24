import { Children } from 'react';
import { altVariantSeparator, colsMap, variantMap } from '@/constants/markdown';
import { getImageVariantClass } from '@/util/markdown';
import CustomImage from '../CustomImage';

/**
 * Renders an image with caption.
 * @param {*} src
 * @param {*} alt
 * @param {*} lang
 * @returns
 */
export function MarkdownImage({ src, alt, lang }) {
  if (!src) return <></>;

  let [variantStr, imgAlt] = alt?.includes(altVariantSeparator)
    ? alt.split(altVariantSeparator)
    : [variantMap.FULL, alt];

  imgAlt = imgAlt || (lang === 'ko' ? '이미지' : 'Image');

  return (
    <figure
      className={`my-6 ${getImageVariantClass(variantStr)}`}
      data-variants={variantStr}
    >
      <CustomImage
        src={src}
        alt={imgAlt}
        width={1200}
        height={800}
        imgClass="cursor-zoom-in"
        hasLightbox
      />

      {imgAlt && (
        <figcaption className="mt-2 text-sm text-gray-500 text-center">
          {imgAlt}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Renders an image grid.
 * @param {*} param0
 * @returns
 */
export function ImageGrid({ children, columns }) {
  let cols = columns;

  if (!cols) {
    const items = Children.toArray(children);
    cols = items.length;
  }

  // Ignore grid if there is only one column
  if (cols <= 1) {
    return <>{children}</>;
  }

  const colsMapClass = colsMap[cols] || '';

  return <div className={`my-6 img-grid ${colsMapClass}`}>{children}</div>;
}
