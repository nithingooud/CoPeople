import React,{ useState } from "react"
import { useNavigate} from "react-router-dom"
import M from "materialize-css"

const CreatePost = () =>{
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    const postData = () => {
        const formData = new FormData()
        formData.append('file',image)
        formData.append('upload_preset',"co-people")
        formData.append('cloud_name','nithinmanda')

        fetch('https://api.cloudinary.com/v1_1/nithinmanda/image/upload',{
            method:'post',
            body: formData
        }).then(res=>res.json()).then(data=> {
            setUrl(data.url)
        })

        fetch("/createPost",{
            method:'post',
            headers:{
                "content-type":"application/json",
                "authorization":localStorage.getItem("jwt")
            },
            body: JSON.stringify({title,body,pic:url})
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error, classes: 'square #d32f2f red darken-2'});
            } else {
                M.toast({html: 'posted succesfully', classes: 'square #66bb6a green lighten-1'});
                navigate('/')
            }
        }).catch(err=> console.log(err))
    }

    return (
        <div className="card input-field" style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div> 
            <button className='btn waves-effect waves-light #64b5f6 blue darken-1' onClick={()=>postData()}>submit post</button>

        </div>
    )
}


export default CreatePost