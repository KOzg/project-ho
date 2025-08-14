export default async function Home() {
  return (
    <>
      <h1 style={{ textAlign: 'center', padding: '0 2.5rem' }}>
        You found me. <br /> This site is still under construction tho so dont
        mind the mess. Contact page has my email. Linkedin at the footer. Resume
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: '0 0.5rem', color: 'aqua' }}
        >
          here(pdf)
        </a>
      </h1>
    </>
  );
}
