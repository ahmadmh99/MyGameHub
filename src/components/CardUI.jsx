import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { auth} from '../firebase/firebase';
import { db } from '../firebase';


const CardUI = props => {

    var [favoritesObject, setFavoritesObject] = useState({});


    const[quantity ,setQuantity] =useState(0);
    const handledecrement =() =>{
        if(quantity>1){ setQuantity(prevCount => prevCount - 1)}
        


    }
   const handleIncrement =() =>{
    if(quantity<10){ setQuantity(prevCount => prevCount + 1)}
    addToShoppingCart();

    }
    
    
    
    
    
    function addToShoppingCart()  {
        console.log(props);

        return new Promise(async (resolve, reject) => {
            await   db.addToShoppingCart(auth.currentUser.uid, props.card, props.userDetails ) ;

            
            resolve();
 
        });   
    }
  
   
    
    function deleteFromShoppingCart(id){
        console.log(id)
        return new Promise(async (resolve, reject) => {
            
            const newValues = await db.updateFavorites(auth.currentUser.uid, props.userDetails, id)
                        
           resolve(newValues);
           }).then((e)=>{
            window.location.href = '';
            props.updateFavoritesObject(e);
           }
           )
    }

    return (
        
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.image} alt="image1" className="card-img-top"/>
            </div>
          <div className="card-body text-dark">
           <h4 className="card-title">{props.title}</h4>
           {
            props.isCategories ?
            <div className='d-flex justify-content-around'>
           <Link className="btn btn-outline-primary" to={{pathname:'/card/' + props.cardId, card: props.card, userDetails: props.userDetails}}>
            Explore more
           </Link>
           </div>
           :
           <div>


            {props.inShoppingCart ?<div><Button className="btn btn-danger" onClick={() => deleteFromShoppingCart(props.card.id)}>Delete</Button>
        
            <Link className="btn btn-outline-primary" to={{pathname:'/card/' + props.cardId, card: props.card, userDetails: props.userDetails, isForGame: true}}>
            more game details
           </Link>
           <br></br>
           <br></br>
           <p><span style={{ color: 'white',borderStyle:'solid', borderColor:'black',backgroundColor:'#0D6EFD',borderColor:'#0D6EFD',padding: 3, borderRadius: 10 }}>Price : {Math.trunc(props.card.price)}₪</span></p>
           
           
            </div> :
           <div>
             <div className="input-group">
            <Button onClick={() => handledecrement(props.card.id)}>——</Button>
            <div className="form-control text-center">{quantity}</div>
            <Button onClick={() => handleIncrement(props.card.id)}>Add to Cart</Button></div>

                
            <br></br>
            
            <Link className="btn btn-outline-primary" to={{pathname:'/card/' + props.cardId, card: props.card, userDetails: props.userDetails, isForGame: true}}>
            more game details
           </Link>
           <br></br>  <br></br>  
           
           <p><span style={{ color: 'white',borderStyle:'solid', borderColor:'black',backgroundColor:'#0D6EFD',borderColor:'#0D6EFD',padding: 3, borderRadius: 10 }}>Price : {Math.trunc(props.card.price)}₪               <span style={{margin:100}}></span>Total Price : {Math.trunc(props.card.price * quantity)}₪                                      
           </span></p>                              
          
           
          </div>
            }
           </div>
           }
           
          </div>
        </div>
    )
}

export default CardUI;
