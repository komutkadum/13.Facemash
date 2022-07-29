import {imageData} from './data';

const Mash = (props) =>{
    return(
        <div className="row mt-4">
          <div className='col-12 col-sm-12 col-md-2'></div>
          <div className="col-6 col-sm-6 col-md-3 text-center d-flex align-items-center justify-content-center">
            <div className='card  hover-opacity ' onClick={()=>props.calculateRating(1)} style={{cursor:'pointer'}}>
              <div className='card-body'>
                <img 
                  src={process.env.PUBLIC_URL+"/images/"+imageData[props.order[props.state1]].url} 
                  alt={imageData[props.order[props.state1]]} />
              </div>
              <div className="card-footer">{props.rating[props.order[props.state1]].rating}</div>
            </div>
          </div>
          <div className=" col-6 col-sm-6 col-md-4 text-center d-flex align-items-center justify-content-center">
            <div className='card hover-opacity' onClick={()=>props.calculateRating(2)} style={{cursor:'pointer'}}>
                <div className='card-body'>
                    <img 
                    src={process.env.PUBLIC_URL+"/images/"+imageData[props.order[props.state2]].url} 
                    alt={imageData[props.order[props.state2]]}/>
                </div>
                <div className="card-footer">{props.rating[props.order[props.state2]].rating}</div>
            </div>
          </div>
        </div>
    );
  }

  export default Mash;