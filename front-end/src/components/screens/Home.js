import React, { useState ,useEffect} from "react"

const Home=()=>{
   const [allImages, setAllImages] = useState([])

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

   return (
      
      <div className="home">
         {allImages.map(image => (
            <div className="card home-card" key={image._id}>
               <h5>{image.postedBy.name}</h5>
               <img src={image.photo}/>
               <div className="card-content">
                  <i className="material-icons">favorite</i>
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