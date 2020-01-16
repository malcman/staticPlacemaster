import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Header from '../components/header';
import Placement from '../components/Placement';

const PlacementPage = ({ location }) => (
  <section>
    <SEO title="Placement" />
    <Header siteTitle="Placemaster" />
    <Placement title="WSN Fall '19" data={location.state.data} />
  </section>
);

export default PlacementPage;
