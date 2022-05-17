import React from 'react';
import { useEffect,useState } from 'react';
import SearchCSS from './Search.module.css';
// import axios from 'axios';
import api from '../../../Services/api';
import PromotionCard from '../card/card';
// import { Link } from 'react-router-dom';
import UIButton from 'components/UI/Button/Button';
import { Link } from 'react-router-dom';

const PromotionSearch = () => {

    const [promotions, setPromotions] = useState([]);
    const [search, setSearch] = useState('');

//     useEffect( () => {
//     const params = {};
//       if (search) {
//         params.title_like = search;
//       }
//     api.get("http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id", {params})
//     .then((response) => {
//       // console.log(response.data);
//       setPromotions(response.data);
//      }
//     );

// }, [search] );

    useEffect(() => {
      const params = {};
      if (search) {
        params.title_like = search;
      }
      const getSearch = async () => {
        try{
          const promotions = await api.get('/promotions?_embed=comments&_order=desc&_sort=id', {params} )
          setPromotions(promotions.data);
        } catch (error){
          console.log(error);
        }
      }
      getSearch();
    }, [search]);

    return ( 
        <>
        <header className={SearchCSS.promotionSearchHeader}>
          <h1>Promo Show!</h1>
          <UIButton component={Link} 
          to="/create" 
          theme="contained-success"
          >
          Nova Promoção
          </UIButton>
        </header>
        <input type="search" 
        className={SearchCSS.promotionSearchInput}
        placeholder="Buscar"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        />
        {promotions.map((promotions) =>(
          <PromotionCard promotion={promotions} key={promotions.id}/>
        )
        )
      }
      </>
     );
}
 
export default PromotionSearch;