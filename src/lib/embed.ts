/** Hosts allowed in <Playground>. Anything else renders nothing, so MDX cannot embed arbitrary pages. */
export const PLAYGROUND_HOSTS = ["stackblitz.com", "codesandbox.io"];

export function isAllowedPlayground(src: string): boolean {
  try {
    const url = new URL(src);
    return (
      url.protocol === "https:" &&
      PLAYGROUND_HOSTS.some(
        (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
      )
    );
  } catch {
    return false;
  }
}

/** YouTube ids are 11 characters of [A-Za-z0-9_-]. */
export function isYouTubeId(id: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(id);
}
