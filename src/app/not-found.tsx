import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>This page doesn&apos;t exist or has moved.</p>
      <p>
        <Link href="/projects">Work</Link> · <Link href="/blog">Writing</Link>
      </p>
    </main>
  );
}
