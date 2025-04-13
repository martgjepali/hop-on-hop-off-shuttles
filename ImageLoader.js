export default function imageLoader({ src }) {
    // If it's already an absolute URL (remote image), return it as-is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
  
    // Otherwise, assume it's local and prefix it with /images/
    return `/images/${src}`;
  }
  