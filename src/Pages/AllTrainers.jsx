import React, { useEffect, useState } from 'react';
import TrainerSection from './TrainerSection';
import { Helmet } from 'react-helmet-async';

const AllTrainers = () => {
    const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | AllTrainers';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])
  return (
    <div>
       <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
     <TrainerSection></TrainerSection>
    </div>
  );
};

export default AllTrainers;