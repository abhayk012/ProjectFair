import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { base_url } from '../services/baseurl';
import { editUserProjectAPI} from '../services/allApi';
import { editProjectResponseContext } from '../context/ContextShare';

function Editproject({ project }) {

  const {editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const [show, setShow] = useState(false);
  const [preview, setpreview] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    languages: project.languages,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectimg: ""
  })

  const handlereset = () => {
    setProjectDetails({
      id: project._id,
      title: project.title,
      languages: project.languages,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectimg: ""
    })
    setpreview("")
  }
  const handleupdate = async (e) => {
    e.preventDefault()
    const { title, languages, github, website, overview, projectimg, id} = projectDetails;
    if (!title || !languages || !github || !website || !overview || !id) {
      alert("Please fiil the form completely")
    }
    else {
      const reqbody = new FormData();
      reqbody.append("title", title);
      reqbody.append("languages", languages);
      reqbody.append("github", github);
      reqbody.append("website", website);
      reqbody.append("overview", overview);
      preview ? reqbody.append("projectimg", projectimg) :
        reqbody.append("projectimg", project.projectimg)
      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqheader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectAPI(id, reqbody, reqheader);
        console.log(result)
        if (result.status === 200) {
          setEditProjectResponse(result)
          alert("Project updated successfully");
          handleClose()
        }
        else {
          alert(result.response.data)
        }
      }
      else {
        const reqheader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectAPI(id, reqbody, reqheader)
        if (result.status === 200) {
          setEditProjectResponse(result)
          alert("Project updated successfully");
          handleClose()
        }
        else {
          alert(result.response.data)
        }
      }
    }
  }
useEffect(() => {
  if (projectDetails.projectimg) {
    setpreview(URL.createObjectURL(projectDetails.projectimg))
  }
}, [projectDetails.projectimg])

return (
  <>
    <button className='btn ' onClick={handleShow}><i class="fa-solid fa-pen-to-square text-info"></i></button>
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-lg-6'>
            <label htmlFor="projectImageUpload">
              <input type="file" style={{ display: "none", cursor: "pointer" }} id='projectImageUpload' onChange={(e) => setProjectDetails({ ...projectDetails, projectimg: e.target.files[0] })} />
              <img src={preview ? preview : `${base_url}/uploads/${project.projectimg}`} height="150px" className='mt-2' alt="" width={"100%"} />
            </label>
          </div>
          <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column '>
            <div className='w-95 mt-2 mb-2'>
              <input type="text" className='form-control' placeholder='Project Titile'
                value={projectDetails.title}
                onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
            </div>
            <div className='mt-2 mt-2'>
              <input type="text" className='form-control' placeholder='Languages Used'
                value={projectDetails.languages}
                onChange={(e) => setProjectDetails({ ...projectDetails, languages: e.target.value })}

              />
            </div>
            <div className='mt-2 mt-2'>
              <input type="text" className='form-control' placeholder='Github URL'
                value={projectDetails.github}
                onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
            </div>
            <div className='mt-2 mt-2'>
              <input type="text" className='form-control' placeholder='Website URL'
                value={projectDetails.website}
                onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })}
              />
            </div>
            <div className='mt-2 w-95'>
              <textarea name="" id="" className='form-control' placeholder='Overview'
                value={projectDetails.overview}
                onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
              ></textarea>
            </div>

          </div>


        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handlereset}>
          Reset
        </Button>
        <Button variant="primary" onClick={handleupdate}>
          Update Project
        </Button>
      </Modal.Footer>
    </Modal>

  </>
)
}

export default Editproject