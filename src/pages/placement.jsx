import React from 'react';

import SEO from '../components/seo';
import Header from '../components/header';
import Placement from '../components/Placement';

const PlacementPage = ({ location }) => {
  let title;
  let data;
  if (location.state) {
    title = location.state.title;
    data = location.state.data;
  }
  return (
    <section>
      <SEO title="Placement" />
      <Header siteTitle="Placemaster" />
      <Placement title={title} data={data} />
    </section>
  );
};

export default PlacementPage;
