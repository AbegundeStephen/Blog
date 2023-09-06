import React,{useState,useEffect} from 'react'
import {db, storage} from "../firebase"
import {useNavigate, useParams} from "react-router-dom"
import ReactTagInput from '@pathofdev/react-tag-input'
import '@pathofdev/react-tag-input/build/index.css'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {addDoc,collection,getDoc,serverTimestamp,updateDoc, doc} from "firebase/firestore"
import {toast} from 'react-toastify'

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments:[],
  likes:[]
}

const categoryOptions = [
  "Education",
  "Agriculture",
  "Fashion",
  "Food",
  "Politics",
  "Sports",
  "Business",
  "Technology"
];


const CreateEditBlog = ({user, setActive}) => {

  const {id} = useParams()
  const navigate = useNavigate()

  
  const [state, setState] = useState(initialState)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)

  const {title,tags,description,category,trending} = state
  
useEffect(() => {
  const uploadFile = () => {
    const storageRef = ref(storage, file.name)
    const uploadTask = uploadBytesResumable(storageRef, file )
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      toast.success("upload is" + progress + "%done")
      setProgress(progress);

      switch(snapshot.state) {
        case "paused" :
        console.log("Upload is paused")
        break;
        case "running":
          console.log("Upload is running")
          break;
          default:
            break
      }
    },(error) => {
      console.log(error)
    },() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
        toast.info("Image has been successfully uploaded to firebase")
        setState((prev) => ({...prev,imgUrl:downLoadUrl}));
      })
    })
  }
  file && uploadFile()
}, [file])

useEffect(() => {
  id && getContentDetail()
},[file])

const getContentDetail = async () => {
  const docRef = doc(db, "contents",id);
  const snapshot = await getDoc(docRef)

  if(snapshot.exists()) {
    setState({...snapshot.data()})
  }
  setActive(null)
}

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  };

  const handleTags = (tags) => {
    setState({...state,tags})
  }

  const handleTrending = (e) => {
    setState({
      ...state,
      trending:e.target.value
    })
  }
  const onCategoryChange = (e) => {
    setState({
      ...state,
      category:e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (title && tags && category && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "article"),{
            ...state,
            timestamp:serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          })
          toast.success("Content created successfully")
        }catch(err){
          toast.error("Unable to create content, Please try again")
        }
      }else {
        try {
          await updateDoc(doc(db,storage),{
            ...state,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId:user.uid
          })
          toast.success("Content created successfully")
          
        }catch(err) {
          console.log(err)
        }

      }
    }else {
      return toast.error("All fields are required")
    }
    navigate("/")
  }

  return (
    <div className="container-fluid mb-4">
      <div className="contaner">
        <div className="tect-center heading py-2">
          {id? "Update Content": "Create Content"}
        </div>
      </div>
      <div className="row h-100 justify-content-center align-items center">
        <div className="col-10 col-md-8 col-lg-6">
          <form action="" className="row blog-form" onSubmit={handleSubmit}>
          <div className="col-12 py-3">
              <input
                type="title"
                className="form-control input-text-box"
                placeholder="TItle"
                name="title"
                value={title}
                onChange={handleChange}
              />
              <div className="col-12 py-3">
              <ReactTagInput placeholder='tags' tags={tags} onChange={handleTags}/>
            </div>
            <div className="col-12 py-3">
              <p className="trending">Is it trending blog ?</p>
              <div className="form-check-inline mx-2">
                <input type="radio" 
                className="form-check-input"
                value="yes"
                name='radioOption'
                checked={trending === "yes" }
                onChange={handleTrending} />
                <label htmlFor="radioOption" className="form-check-label">Yes&nbsp;</label>
                <input type="radio" 
                className="form-check-input"
                value="yes"
                name='radioOption'
                checked={trending === "no" }
                onChange={handleTrending} />
                <label htmlFor="radioOption" className="form-check-label">No&nbsp;</label>
              </div>
            </div>
            <div className="col-12 py-3">
              <select value={category}
              onChange={onCategoryChange}
              className='catg-dropdown'>
                <option>Please select category</option>
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option || ""}>{option}</option>
                ))}
              </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                className='form-control description-box'
                placeholder='Description'
                name='description'
                onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <input type="file" 
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <div className="col-12 py-3 text-center">
                <button type='submit' className="btn btn-add"
                disabled={progress !== null && progress <100}>
                  {id? "Update" : "Create"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEditBlog