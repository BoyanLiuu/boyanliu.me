import Link from "next/link";
import { Container, Display, Mark } from "@/components/swiss/layout";

export default function NotFound() {
  return (
    <Container>
      <Display className="pt-10 lg:pt-14">
        404
        <Mark />
      </Display>
      <p className="mt-6 text-h3 font-normal">
        This page doesn&apos;t exist or has moved.
      </p>
      <p className="mt-6 flex gap-6 text-body">
        <Link
          href="/projects"
          className="underline underline-offset-4 hover:text-accent"
        >
          Work →
        </Link>
        <Link
          href="/blog"
          className="underline underline-offset-4 hover:text-accent"
        >
          Writing →
        </Link>
      </p>
    </Container>
  );
}
