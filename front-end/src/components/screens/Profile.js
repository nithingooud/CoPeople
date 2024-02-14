import React,{useEffect, useState} from "react"

const Profile=()=>{
    const [userPosts,setUserPosts] = useState([])
    const [userDetails,setUserDetails] = useState({})
    useEffect(()=>{
       fetch('/mypost',{
           method:'get',
           headers:{
            "authorization": localStorage.getItem("jwt")
           }
       }).then(res=>res.json()).then(data=>{
        setUserPosts(data)
        setUserDetails(data[0]?.postedBy)                                     
      })
    },[])
    return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
          <div style={{display:"flex",justifyContent:"space-around",margin:"30px 0px",borderBottom:"1px solid grey"}}>
            <div>
               <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
               src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"/>
            </div>
            <div>
                <h3>{userDetails.name}</h3>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{userPosts.length} posts</h6>
                    <h6>{userDetails.followers} followers</h6>
                    <h6>{userDetails.following} following</h6>
                </div>
            </div>
          </div>
          <div className="gallery">
          {userPosts.map(post => {
            return (
                <img className="item" src={post.photo} alt="item.title" key={post._id}/>
            )
          })}
          </div>
       </div>
    )
}

export default Profile