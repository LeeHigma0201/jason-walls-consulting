// /trades sets its own openGraph metadata, so the root opengraph-image
// doesn't cascade here — re-export it at this segment to attach og:image.
export { default, alt, size, contentType } from "../opengraph-image";
