import { map } from 'lodash-es';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import MarkdownItAttrs from 'markdown-it-attrs';

export const MarkdownOptions: MarkdownIt.Options = {
  html: true,
  breaks: true,
  typographer: true
};

export const markdown = new MarkdownIt(MarkdownOptions).use(MarkdownItAttrs);

export const DOMPurifyOptions = {
  RETURN_TRUSTED_TYPE: true,
  ADD_TAGS: ['code'],
  USE_PROFILES: {
    html: true
  }
};

export const md = {
  html: (str: string, purify = true): string | HTMLElement | DocumentFragment =>
    purify
      ? DOMPurify.sanitize(markdown.render(str), DOMPurifyOptions)
      : markdown.render(str),
  collection: (
    str: string
  ): Pick<HTMLElement, 'tagName' | 'innerHTML' | 'outerHTML'>[] =>
    map(
      new DOMParser().parseFromString(
        DOMPurify.sanitize(md.html(str, false) as string, {
          ...DOMPurifyOptions
        }),
        'text/html'
      ).body.children,
      (el: Element) => ({
        tagName: el.tagName,
        innerHTML: DOMPurify.sanitize(el.innerHTML, DOMPurifyOptions),
        outerHTML: DOMPurify.sanitize(el.outerHTML, DOMPurifyOptions)
      })
    )
};
