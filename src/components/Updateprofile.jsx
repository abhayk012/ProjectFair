import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { removeprofileAPI, updateprofileAPI } from '../services/allApi';
import { base_url } from '../services/baseurl';
import { addProfieResponseContext } from '../context/ContextShare';

function Updateprofile({ profile }) {
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [preview, setpreview] = useState("")
    const { addProfieResponse,setAddProfieResponse } = useContext(addProfieResponseContext)


    const [profileDetails, setprofileDetails] = useState({
        id: profile._id,
        linkedin: profile.linkedin,
        github: profile.github,
        profileimg: ""
    })


    const handlereset = () => {
        setprofileDetails({
            id: profile._id,
            linkedin: profile.linkedin,
            github: profile.github,
            profileimg: ""
        })
        setpreview("")
    }
    const handleupdate = async (e) => {
        e.preventDefault()
        const { linkedin, github, profileimg, id } = profileDetails;
        if (!linkedin || !github || !id) {
            alert("Please fiil the form completely")
        }
        else {
            const reqbody = new FormData();
            reqbody.append("linkedin", linkedin);
            reqbody.append("github", github);
            preview ? reqbody.append("profileimg", profileimg) :
                reqbody.append("profileimg", profile.profileimg)
            const token = sessionStorage.getItem("token");
            if (preview) {
                const reqheader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateprofileAPI(id, reqbody, reqheader);
                console.log(result)
                if (result.status === 200) {
                    //   setEditProjectResponse(result)
                    alert("Project updated successfully");
                    setAddProfieResponse(result)
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
                const result = await updateprofileAPI(id, reqbody, reqheader)
                if (result.status === 200) {
                    //   setEditProjectResponse(result)
                    alert("Project updated successfully");
                    setAddProfieResponse(result)
                    handleClose()
                }
                else {
                    alert(result.response.data)
                }
            }
        }
    }
    useEffect(() => {
        if (profileDetails.profileimg) {
            setpreview(URL.createObjectURL(profileDetails.profileimg))
        }
    }, [profileDetails.profileimg])

    

    return (
        <>
            <button className='btn btn-success rounded w-100 mt-3' onClick={handleShow}>Update</button>

            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update/Remove Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="uploadProfileimg">
                        <input type="file" style={{ display: "none", cursor: "pointer" }} id='uploadProfileimg' onChange={(e) => setprofileDetails({ ...profileDetails, profileimg: e.target.files[0] })} />
                        <img src={preview ? preview : `${base_url}/uploads/${profile.profileimg}`} height="300px" className='ms-5' alt="" width={"100%"} />
                    </label>
                    <div className='w-95 mt-3 mb-2'>
              <input type="text" className='form-control' placeholder='github'
                value={profileDetails.github}
                onChange={(e) => setprofileDetails({ ...profileDetails, github: e.target.value })} />
            </div>
            <div className='w-95 mt-3 mb-2'>
              <input type="text" className='form-control' placeholder='Linkedin'
                value={profileDetails.linkedin}
                onChange={(e) => setprofileDetails({ ...profileDetails, linkedin: e.target.value })} />
            </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleupdate} className='btn-success'>Update</Button>
                    <Button onClick={handlereset} className='btn-warning'>Reset</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Updateprofile