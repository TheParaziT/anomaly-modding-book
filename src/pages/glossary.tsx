import React from 'react';
import Layout from '@theme/Layout';
import GlossaryTable from '@site/src/components/GlossaryTable';
import glossaryData from '@site/src/data/glossary';

const GlossaryPage: React.FC = () => {
  return (
    <Layout
      title="Glossary"
      description="Comprehensive glossary of S.T.A.L.K.E.R. Anomaly modding terms and concepts"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h1>Anomaly Modding Glossary</h1>
            <p className="glossary-intro">
              This glossary defines key terms and concepts related to S.T.A.L.K.E.R. Anomaly
              modding. Use the search and filter options to find specific terms, or browse through
              all entries.
            </p>

            <GlossaryTable data={glossaryData} />

            <div className="glossary-footer">
              <h2>How to Reference Terms</h2>
              <p>You can link directly to any term in this glossary using its ID. For example:</p>
              <ul>
                <li>
                  <a href="#anomaly">Anomaly</a> - <code>#anomaly</code>
                </li>
                <li>
                  <a href="#artifact">Artifact</a> - <code>#artifact</code>
                </li>
                <li>
                  <a href="#xray-engine">X-Ray Engine</a> - <code>#xray-engine</code>
                </li>
              </ul>
              <p>
                Use the copy link button (🔗) next to each term to easily copy a direct link to that
                term.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GlossaryPage;
