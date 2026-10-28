import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container page-head">
      <p className="eyebrow">404</p>
      <h1>Nothing here.</h1>
      <p>
        That page moved or never existed. <Link href="/">Head home</Link> or press ⌘K to jump somewhere.
      </p>
    </section>
  );
}
