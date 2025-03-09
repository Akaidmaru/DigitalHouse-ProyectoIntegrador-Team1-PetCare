import React from 'react'
import { useParams } from 'react-router-dom';
import { RecommendedServices } from '../components/RecommendedServices';
import { CategoriesGrid } from '../components/CategoriesGrid';

export const Categories = () => {
  const { id } = useParams();
  return (
    <>
        <main className="mainContainer">

            <div style={{ "marginTop": "22px" }}>
                <CategoriesGrid id={id} />
            </div>
        </main>
    </>
  )
}
