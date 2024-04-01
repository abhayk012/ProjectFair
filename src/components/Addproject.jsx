import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addprojectAPI } from '../services/allApi';
import { addProjectResponseContext } from '../context/ContextShare';

function Addproject() {
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)
  const [preview, setPreview] = useState("")
  const [token, settoken] = useState("")
  const [projectDetails, setprojectDetails] = useState({
    title: "",
    languages: "",
    github: "",
    website: "",
    overview: "",
    projectimg: ""
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, languages, github, website, overview, projectimg } = projectDetails;
    if (!title || !languages || !github || !website || !overview || !projectimg) {
      alert("Please fill the form completely")
    }
    else {
      // 
      // 
      const reqbody = new FormData();
      reqbody.append('title', title)
      reqbody.append('languages', languages)
      reqbody.append('github', github)
      reqbody.append('website', website)
      reqbody.append('overview', overview)
      reqbody.append('projectimg', projectimg)
      const reqheader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await addprojectAPI(reqbody, reqheader)
      if (result.status === 200) {
        alert("Project added successfully");
        setAddProjectResponse(result)
        handlecloseclear();
        handleClose();
      }
      else {
        alert(result.response.data)
      }
    }
    console.log(projectDetails);
  }
  useEffect(() => {
    if (projectDetails.projectimg) {
      setPreview(URL.createObjectURL(projectDetails.projectimg))
    }
  }, [projectDetails.projectimg])
  useEffect(() => {
    settoken(sessionStorage.getItem("token"))
  }, [])
  const handlecloseclear = () => {
    setprojectDetails(
      {
        title: "",
        languages: "",
        github: "",
        website: "",
        overview: "",
        projectimg: ""
      }
    )
    setPreview("")
  }
  return (
    <>
      <div className='mb-5'>
        <Button variant='success' onClick={handleShow}>Add Projects</Button>


        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Add <span style={{ color: "orange" }}>Projects</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className="col-lg-6">
                <label htmlFor="projectimgupload">
                  <img src={preview ? preview : 'https://tse4.mm.bing.net/th?id=OIP.djrHhPrOVynppSdGJ2dtPgHaHa&pid=Api&P=0&h=180'} height="150px" className='ms-5 mt-5 me-5' />
                  <input type="file" id='projectimgupload' style={{ display: 'none' }}
                    onChange={((e) => setprojectDetails({ ...projectDetails, projectimg: e.target.files[0] }))} />
                </label>
              </div>
              <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
                <div className='w-100 mt-2 '>
                  <input value={projectDetails.title} type="text" className='form-control w-100 border border-success' placeholder='Project Title'
                    onChange={((e) => setprojectDetails({ ...projectDetails, title: e.target.value }))} />
                </div>
                <div className='w-100 mt-4 '>
                  <input value={projectDetails.languages} type="text" className='form-control w-100 border border-success' placeholder='Languages used'
                    onChange={((e) => setprojectDetails({ ...projectDetails, languages: e.target.value }))} />
                </div>
                <div className='w-100 mt-4 '>
                  <input value={projectDetails.github} type="text" className='form-control w-100 border border-success' placeholder='Github URL'
                    onChange={((e) => setprojectDetails({ ...projectDetails, github: e.target.value }))} />
                </div>
                <div className='w-100 mt-4 '>
                  <input value={projectDetails.website} type="text" className='form-control w-100 border border-success' placeholder='Website URL'
                    onChange={((e) => setprojectDetails({ ...projectDetails, website: e.target.value }))} />
                </div>
                <div className='w-100 mt-4 '>
                  <textarea value={projectDetails.overview} className='form-control border border-success' placeholder='Overview'
                    onChange={((e) => setprojectDetails({ ...projectDetails, overview: e.target.value }))}></textarea>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlecloseclear}>
              Clear Fields
            </Button>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              Add Project
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Addproject