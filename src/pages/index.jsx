import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Header from '../components/header';
import ModuleContainer from '../components/ModuleContainer';


const IndexPage = () => (
  <section>
    <SEO title="Home" />
    <Header siteTitle="Placemaster" />
    <ModuleContainer />
  </section>
);

export default IndexPage;
