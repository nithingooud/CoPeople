import React, { useState ,useEffect, useContext} from "react"
import {UserContext} from '../../App'

const Home=()=>{
   const [allImages, setAllImages] = useState([])
   const {state,dispatch} = useContext(UserContext)

   useEffect(()=>{
      getImages()
   },[])

   const getImages = () => {
       fetch('/allposts',{
         method:'get',
         headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("jwt")
        },
       }).then(res=> res.json()).then(data=>{console.log(data); setAllImages(data)})
   }

   const like = (id) => {
      fetch('/like', {
         method:'put',
         headers:{
            "Content-Type":"application/json",
            "authorization":localStorage.getItem("jwt")
         },
         body: JSON.stringify({postId:id})
      }).then(res=>res.json()).then(result => {
         const newData = allImages.map(item => {
            if(item._id == result._id){
               return result
            } else {
               return item
            }
         })
         setAllImages(newData);
      })
   }

   
   const unLike = (id) => {
      fetch('/unlike', {
         method:'put',
         headers:{
            "Content-Type":"application/json",
            "authorization":localStorage.getItem("jwt")
         },
         body: JSON.stringify({postId:id})
      }).then(res=>res.json()).then(result=>{
         const newData = allImages.map(item => {
            if(item._id == result._id){
               return result
            } else {
               return item
            }
         })
         setAllImages(newData);
      })
   }

   const comment = ( ) => {
      
   }

   return (
      
      <div className="home">
         {allImages.map(image => (
            <div className="card home-card" key={image._id}>
               <h5>{image.postedBy.name}</h5>
               <img src={image.photo}/>
               <div className="card-content">
                  {image.likes.includes(state._id)? 
                  <i onClick={()=>unLike(image._id)} className="material-icons">thumb_down</i>
                  : 
                  
                     <i onClick={()=>like(image._id)} className="material-icons">thumb_up</i>
                  }
                  <h6>{image.likes.length} likes</h6>
                  <h6>{image.title}</h6>
                  <p>{image.body}</p>
                  <input type="text" placeholder="add a comment"/>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Home