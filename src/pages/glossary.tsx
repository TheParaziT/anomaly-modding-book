import React from 'react';
import Layout from '@theme/Layout';
import GlossaryTable from '@site/src/components/GlossaryTable';
import glossaryData from '@site/src/data/glossary';

const GlossaryPage: React.FC = () => {
  return (
    <Layout title="Glossary" description="Glossary of S.T.A.L.K.E.R. modding terms and concepts">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GlossaryPage;
