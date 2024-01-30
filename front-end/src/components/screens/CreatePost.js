import React,{ useState } from "react"
import { Form } from "react-router-dom"

const CreatePost = () =>{
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")

    const postData = () => {
        const formData = new FormData()
        formData.append('file',image)
        formData.append('upload_preset',"co-people")
        formData.append('cloud_name','nithinmanda')

        fetch('https://api.cloudinary.com/v1_1/nithinmanda/image/upload',{
            method:'post',
            body: formData
        })


        // fetch('/createPost', {
        //     method:'POST',
        //     headers:{
        //         "content-type":"application/json"
        //     },
        //     body: formData,
        // })
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
            <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>submit post</button>

        </div>
    )
}


export default CreatePost