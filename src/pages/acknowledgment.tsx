// acknowledgment.tsx
import React from 'react';
import Layout from '@theme/Layout';
import Authors from '../components/Authors';

/**
 * Страница благодарностей и признаний - отображает благодарности контрибьюторам, используемым инструментам и ресурсам
 * 
 * @component
 * @example
 * ```tsx
 * <AcknowledgmentPage />
 * ```
 * 
 * @returns {JSX.Element} Страница благодарностей
 */
const AcknowledgmentPage: React.FC = () => {
  return (
    <Layout
      title="Acknowledgment"
      description="Credits and thanks to our contributors and tools used"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h1 tabIndex={0} aria-label="Acknowledgment">
              Acknowledgment
            </h1>
            <p>
              Thank you to everyone who has contributed to the Anomaly Modding Book. This project is
              a community effort, and it would not be possible without the dedication of many
              contributors, maintainers, and tool authors.
            </p>

            <section aria-labelledby="contributors-heading" className="margin-top--lg">
              <h2 id="contributors-heading" tabIndex={0} aria-label="Contributors">
                Contributors
              </h2>
              <p>
                We appreciate all contributors who have shared knowledge, reviewed content, improved
                examples, and maintained the documentation. Special thanks to community members from
                the S.T.A.L.K.E.R. modding scene who provided insights and resources.
              </p>
            </section>

            <section aria-labelledby="tools-heading" className="margin-top--lg">
              <h2 id="tools-heading" tabIndex={0} aria-label="Tools and Technologies">
                Tools & Technologies
              </h2>
              <ul>
                <li>
                  <a href="https://docusaurus.io/">Docusaurus</a> — for powering this documentation site.
                </li>
                <li>React & TypeScript — for building reusable, type-safe UI components.</li>
                <li>Community tools across Blender and S.T.A.L.K.E.R.</li>
              </ul>
            </section>

            <section aria-labelledby="credits-heading" className="margin-top--lg">
              <h2 id="credits-heading" tabIndex={0} aria-label="Credits">
                Credits
              </h2>
              <p>
                During the development of this book, information was taken from many sites and
                forums. Here are the main ones:
              </p>
              <ul>
                <li>
                  <a href="https://ap-pro.ru/">Ap-Pro</a>
                </li>
                <li>
                  <a href="https://www.amk-team.ru/forum/forum/45-shkola-moddinga/">AMK-Team</a>
                </li>
                <li>
                  <a href="http://sdk.stalker-game.com/">s.t.a.l.k.e.r mod portal</a>
                </li>
                <li>
                  <a href="https://web.archive.org/web/20230501075907/https://www.gameru.net/forum/index.php?showforum=186">
                    GAMERU (Wayback Machine)
                  </a>
                </li>
                <li>
                  <a href="https://xray-engine.org/index.php">xrWiki</a>
                </li>
                <li>
                  <a href="https://discord.gg/WSaEzuu6Qs">"Союз Модмейкеров" Discord Server</a>
                </li>
                <li>
                  <a href="https://xray-engine.org/index.php?title=%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0">
                    xray-engine.org
                  </a>
                </li>
                <li>
                  <a href="https://github.com/PavelBlend/blender-xray/wiki">
                    Blender X-Ray Addon Wiki
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/hWTbHxaYWz">IX-Ray Platform Discord Server</a>
                </li>
              </ul>
              <p>Also thanks for the advice of individuals:</p>
              <Authors
                authors={[
                  'xottab-duty',
                  'sergeant_rogers',
                  'hrusteckiy',
                  'forserx',
                  'mafiosi_ghost',
                  'adi',
                  'sabulanis',
                ]}
                size="large"
                showTitle={true}
                showDescription={true}
              />
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AcknowledgmentPage;