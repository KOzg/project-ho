export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div>
          <h1>{`Welcome to Kaan Ozgunay's portfolio site`}</h1>
          <nav>
            <ul>
              <li>
                <a href="/ho">Project HO!</a>
              </li>
              <li>
                <a href="/cv">CV</a>
              </li>
              <li>
                <a href="/about">About the site</a>
              </li>
              <li>
                <a href="/vibe">Vibe Projects</a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
