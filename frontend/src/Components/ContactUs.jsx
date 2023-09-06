import React, { useState } from 'react'
import { db, axios } from '../firebase'
import {toast} from 'react-toastify'
import Footer from './Footer'

 const initialState = {
    name:"",
    email:"",
    subject:"",
    message:""
 }
const ContactUs = () => {
    const [state,setState] = useState(initialState)
    const {name, email, subject,message} = state


    const handleChange =(e) => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       submitMail()
       resetForm()
        
        }
           
        const resetForm = () => {
            setState({
                name:"",
                email:"",
                subject:"",
                message:""
            })
        }
    const submitMail = () => {
            axios.post('https://us-central1-Blog.cloudfunctions.net/submit',
            state
            ).then(response => {
                db.collection('emails').add({
                    Name:name,
                    Email:email,
                    Subject:subject,
                    Message:message,
                    time:new Date()
                })
                toast.success("Your Message has been Sent")
            }).catch(error => {
                console.log(error)
            })
    }

  return (
            <>
            <div class="container-lg-fluid bg-dark mt-5">
                <div class="container p-5 bg-light">
                    <div class="row justify-content-center text-center align-items-center ">
                        <div class="col-10 col-md-8 col-lg-6 lign-items-center text-center">
                            <div class="section-title">
                                <h2 class="h3 text-success">Contact Us</h2>
                                <p class="fw-bold">Get in touch and let us know how we may render our sevices to you</p><hr/>
                                <form id="contact-form" class="form-control" onSubmit={handleSubmit} 
                                    method="POST">
                                <div class="form-group">
                                <div class="row">
                                <div class="col-md-6">
                                    <input placeholder = "Name"  id="name" type="text" 
                                       class="form-control" required value={name} 
                                       onChange={handleChange}/>
                                </div>
                                <div class="col-md-6">
                                    <input placeholder = "Email"  id="email" type="email"
                                      class="form-control" aria-describedby="emailHelp"
                                      required value={email} onChange={handleChange}/>
                                </div>
                                </div>
                                </div>
                                <div class="form-group">
                                    <input placeholder = "Subject"  id="subject" type="text"
                                      class="form-control" required value={subject}
                                      onChange={handleChange}/>
                                </div>
                                <div class="form-group">
                                    <textarea placeholder = "Message"  id="message" 
                                       class="form-control" rows="1" 
                                       required value={message}
                                       onChange= {handleChange}/>
                                </div>
                                <button type="submit" class="btn btn-group  submit">Submit</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
                </div>
                <Footer/>
                </>
        );
    }

export default ContactUs