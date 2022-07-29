import { useEffect, useRef, useState } from 'react';
import Mash from './Components/Mash'
import RatingList from './Components/RatingList'
import './style/style.css';

const RATING = 1500;
//constant k factor in elo rating
const k = 32;

function App() {
  const [view,setView] = useState(false);
  //the order but soon is shuffled based on fisher yates algo immeidatedly after the component has loaded
  const [order, setOrder] = useState([...Array(136).keys()])
  //left side state
  const [state1,setState1] = useState(0);
  //right side state
  const [state2,setState2] = useState(1);
  //rating
  const [rating, setRating] = useState(range(135))
  const ref = useRef();

  useEffect(()=>{
    shuffleNumbers();
  },[])

  //shuffle the order in fisher yates algorithm
  const shuffleNumbers = () =>{
      const tempOrder = [...order]; 
      let n = tempOrder.length;
      //fisher yates algorithm
      for(let i=n-1;i>0;i--){
        const j = Math.round(Math.random()*(i+1));
        const temp = tempOrder[i];
        tempOrder[i] = tempOrder[j];
        tempOrder[j] = temp;
      }
      setOrder([...tempOrder]);
  }
  const probability = (r1,r2) =>{
    return 1/(1+Math.pow(10,(r1-r2)/400));
  }
  const calculateRating = (winner)=>{
    let tempRating = [...rating];
    let max = Math.max(state1,state2);
    let p1Rating = rating[order[state1]].rating;
    let p2Rating = rating[order[state2]].rating;
    var pa = probability(p2Rating,p1Rating);
    var pb = probability(p1Rating,p2Rating);

    //check if the comparision has been finished
    if(max===135){
      setView(true);
    }
    
    if(winner===1){
        let r1 = Math.floor(p1Rating+k*(1-pa));
        let r2 = Math.floor(p2Rating+k*(0-pb));
        tempRating[order[state1]].rating = r1;
        tempRating[order[state2]].rating = r2;
        setState2(max+1);

    }else if(winner===2){
      let r1 = Math.floor(p1Rating+k*(0-pa));
      let r2 = Math.floor(p2Rating+k*(1-pb));
      tempRating[order[state1]].rating = r1;
      tempRating[order[state2]].rating = r2;
      setState1(max+1);
    }
    setRating([...tempRating]);
  }

  return (
      <div className="container"> 
        <div className='row text-center'>
          <div className='col-12 col-md-6'>
            <div className="view my-3">
              <button type="button" onClick={()=>setView(prev=>!prev)} className="glow-on-hover">{!view?"See Rating >":"Go Mash >"}</button>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className="view my-3">
              <button type="button" onClick={()=>ref.current.scrollIntoView({behavior:"smooth"})} className="glow-on-hover">See Notes</button>
            </div>
          </div>
        </div>
        {
          view?
          <RatingList rating={rating} order={order}/>:
          <Mash 
            order={order}
            state1={state1}
            state2={state2}
            calculateRating={calculateRating}
            rating={rating}/>
        }
        <div className='row'>
          <div className='col-md-12 text-center mt-5 mb-5' style={{height:'80vh'}}>
              <div className='card' ref={ref}>
                <div className='card-header'><h1>NOTE</h1></div>
                <div className='card-body'>
                  <p>Select one photo and click on the card. It will remove the other one and place a new photo.</p>
                  <p>Each photo has its own rating starting at 1500. As you click on the photos, there rating will change accordingly.</p>
                  <p>The algorithm is based on the ELO rating system which is used by chess players to update their rank.</p>
                  <p>You can check the rating at the top button Rating.</p>
                  <p>You can vice/versa go to the mash page, click on the top left button.</p>
                  <p>The photo's are random at first which is based on the algorithm fisher yates algorithm.</p>
                </div>
              </div>
          </div>
        </div>
       
         
      </div>
  );
}

const range = (stop) => {
  let arr = [];
  for(let i=0;i<=stop;i++){
    arr.push({id : i,rating : RATING})
  }
  return arr;
}

export default App;
