/*
 * @Author: zzz
 * @LastEditors: zzz
 */
import { inBrowser } from 'vitepress'

export const hashRE = /#.*$/;
export const extRE = /(index)?\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^[a-z]+:/i;
export function isNullish(value) {
    return value === null || value === undefined;
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isExternal(path) {
    return outboundRE.test(path);
}
export function isActive(route, path) {
    if (path === undefined) {
        return false;
    }
    const routePath = normalize(`/${route.data.relativePath}`);
    const pagePath = normalize(path);
    return routePath === pagePath;
}
export function normalize(path) {
    return decodeURI(path).replace(hashRE, '').replace(extRE, '');
}
export function joinUrl(base, path) {
    const baseEndsWithSlash = base.endsWith('/');
    const pathStartsWithSlash = path.startsWith('/');
    if (baseEndsWithSlash && pathStartsWithSlash) {
        return base.slice(0, -1) + path;
    }
    if (!baseEndsWithSlash && !pathStartsWithSlash) {
        return `${base}/${path}`;
    }
    return base + path;
}
/**
 * get the path without filename (the last segment). for example, if the given
 * path is `/guide/getting-started.html`, this method will return `/guide/`.
 * Always with a trailing slash.
 */
export function getPathDirName(path) {
    const segments = path.split('/');
    if (segments[segments.length - 1]) {
        segments.pop();
    }
    return ensureEndingSlash(segments.join('/'));
}
export function ensureSlash(path) {
    return ensureEndingSlash(ensureStartingSlash(path));
}
export function ensureStartingSlash(path) {
    return /^\//.test(path) ? path : `/${path}`;
}
export function ensureEndingSlash(path) {
    return /(\.html|\/)$/.test(path) ? path : `${path}/`;
}
/**
 * Remove `.md` or `.html` extention from the given path. It also converts
 * `index` to slush.
 */
export function removeExtention(path) {
    return path.replace(/(index)?(\.(md|html))?$/, '') || '/';
}



export const throttleAndDebounce = (fn, delay) => {
    let timeout
    let called = false
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
      if (!called) {
        fn()
        called = true
        setTimeout(() => {
          called = false
        }, delay)
      } else {
        timeout = setTimeout(fn, delay)
      }
    }
  }

  export function insertLinkIcon(contentRef) {
    if (!inBrowser) return
    const links = Array.from(
      contentRef.value?.$el.querySelectorAll('a:not(.header-anchor)') ?? []
    )
  
    links.forEach((link) => {
      link.classList.add('vp-link')
      if (
        !link.href.startsWith(window.origin) &&
        !link.innerHTML.includes('<img')
      ) {
        link.innerHTML = `
          ${link.innerHTML}
          <svg class="link-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path
              d="
                M853.333333 469.333333a42.666667 42.666667 0 0 0-42.666666
                42.666667v256a42.666667 42.666667 0 0 1-42.666667 42.666667H256a42.666667
                42.666667 0 0 1-42.666667-42.666667V256a42.666667
                42.666667 0 0 1 42.666667-42.666667h256a42.666667 42.666667
                0 0 0 0-85.333333H256a128 128 0 0 0-128 128v512a128 128
                0 0 0 128 128h512a128 128 0 0 0 128-128v-256a42.666667
                42.666667 0 0 0-42.666667-42.666667z
              "
              fill="currentColor">
            </path>
            <path
              d="
                M682.666667 213.333333h67.413333l-268.373333 267.946667a42.666667
                42.666667 0 0 0 0 60.586667 42.666667 42.666667
                0 0 0 60.586666 0L810.666667 273.92V341.333333a42.666667
                42.666667 0 0 0 42.666666 42.666667 42.666667 42.666667 0 0 0
                42.666667-42.666667V170.666667a42.666667 42.666667 0 0
                0-42.666667-42.666667h-170.666666a42.666667
                42.666667 0 0 0 0 85.333333z
              "
              fill="currentColor"
            >
            </path>
          </svg>
          `
      }
    })
  }