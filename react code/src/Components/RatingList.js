import {useState,useRef,useEffect} from 'react';
import {imageData} from './data';

const RatingList = (props) =>{
    const [sortedRating,setSortedRating] = useState([]);
    const top = useRef();
  
    let counter = 1;
    useEffect(()=>{
      customSorting();
    },[]);
    const customSorting = () =>{
      setSortedRating([...props.rating.sort(compare)]);
    }
    //sort the array of objects  using custom sorting
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const bandA = a.rating;
      const bandB = b.rating;
    
      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison* -1;
    }
    return (
      <div className="row">
        <div ref={top}></div>
        <div className="top" onClick={()=>top.current.scrollIntoView({behavior:"smooth"})}>Top</div>
        {
          sortedRating.map(rate=>(
            <List key={rate.id} top={top} count={counter++} id={rate.id} rate={rate.rating}/>
          ))
        }
      </div>
    );
  }

  const List = ({rate,id,count}) =>{
    return (
      <div className='col-6 col-sm-6 col-md-4 col-lg-3 mb-4 text-center'>
        <div className='card hover-opacity'>
          <div className='card-header d-flex justify-content-center bg-dark'>
            <div className="counter">{count}</div>
          </div>
          <div className='card-body'>
            <img src={process.env.PUBLIC_URL+"/images/"+imageData[id].url} className="img-top" alt={rate}/>
          </div>
          <div className="card-footer bg-dark text-white" >
            Rating {rate}
          </div>
        </div>
      </div>
    );
  }

  export default RatingList;