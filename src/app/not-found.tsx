import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1>404</h1>
      <p>This page doesn&apos;t exist or has moved.</p>
      <p>
        <Link href="/projects">Work</Link> · <Link href="/blog">Writing</Link>
      </p>
    </div>
  );
}
