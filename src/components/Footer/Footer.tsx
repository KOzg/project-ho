import styles from './Footer.module.scss';

export default function Footer() {
  const buildDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className="row">
            <div className={styles.footerContainer}>
              <div className={styles.copyrightContainer}>
                <p className={styles.copyright}>
                  {new Date().getFullYear()} &copy; Kaan Ozgunay
                </p>
                <span className={styles.lastUpdated}>
                  Last updated: {buildDate}
                </span>
              </div>
              <div className={styles.socialContainer}>
                <ul className={styles.socialList}>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/in/kaan-ozgunay/"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://github.com/KOzg"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
