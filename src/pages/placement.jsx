import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Header from '../components/header';
import Placement from '../components/Placement';

import JSONData from '../../content/placement.json';

const PlacementPage = () => (
  <section>
    <SEO title="Placement" />
    <Header siteTitle="Placemaster" />
    <Placement title="WSN Fall '19" data={JSONData} />
  </section>
);

export default PlacementPage;
