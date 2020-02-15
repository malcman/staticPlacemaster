import React from 'react';

import SEO from '../components/seo';
import Header from '../components/header';

import PanelContainer from '../components/containers/PanelContainer/PanelContainer';


const IndexPage = () => {
  return (
    <section>
      <SEO title="Home" />
      <Header siteTitle="Placemaster" />
      <PanelContainer />
    </section>
  );
};

export default IndexPage;
