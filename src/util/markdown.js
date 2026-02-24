import { visit } from 'unist-util-visit';
import { variantMap } from '@/constants/markdown';

/**
 * Returns the class name for the image variant.
 * @param {*} variants
 * @returns
 */
export const getImageVariantClass = (variants) => {
  if (!variants) return 'w-auto';

  return variants
    .split('-')
    .map((variant) => {
      const v = variant.toLowerCase();

      switch (v) {
        case variantMap.SQUARE:
          return 'img-square';
        case variantMap.VIDEO:
          return 'img-video';
        case variantMap.FULL:
          return 'img-full';
        case variantMap.HALF:
          return 'img-half';
        case variantMap.THIRD:
          return 'img-third';
        case variantMap.FOURTH:
          return 'img-fourth';
        default:
          return 'img-full';
      }
    })
    .join(' ');
};

/**
 * Handles the image grid directive.
 * @returns
 */
export default function remarkImageGrid() {
  return (tree) => {
    visit(tree, 'containerDirective', (node, index, parent) => {
      if (node.name !== 'grid') return;

      const data = node.data || (node.data = {});
      const attributes = node.attributes || {};

      // Set the directive name
      data.hName = 'imageGrid';
      data.hProperties = {
        columns: attributes.cols || 0
      };

      node.children = node.children
        .filter((c) => c.type === 'paragraph' || c.type === 'image')
        .flatMap((c) => (c.type === 'paragraph' ? c.children : [c]))
        .filter((c) => c.type === 'image');
    });
  };
}
