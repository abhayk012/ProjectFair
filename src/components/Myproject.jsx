import React, { useContext, useState } from 'react'
import Addproject from './Addproject'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import { deleteProjectApi, userprojectAPI } from '../services/allApi'
import { useEffect } from 'react'
import Editproject from './Editproject'

function Myproject() {
    const [userproject, setuserproject] = useState([])
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const {editProjectResponse, setEditProjectResponse}=useContext(editProjectResponseContext)
    const getuserproject = async () => {
        const token = sessionStorage.getItem("token")
        const reqheader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await userprojectAPI(reqheader);
        setuserproject(result.data)
    }
    useEffect(() => {
        getuserproject()
    }, [addProjectResponse,editProjectResponse])

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqheader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await deleteProjectApi(id,reqheader)
        if(result.status===200){
          alert("Project deleted successfully");
          getuserproject();
        }
      }
    return (
        <>
            <div className="card shadow p-5 ms-3 me-3 mb-5">
                <div className='d-flex'>
                    <h3 className=''>My Project</h3>
                    <div className='ms-auto'>
                        <Addproject />
                    </div>
                </div>
                <div>
                    {
                        userproject.length > 0 ?
                            userproject.map((item) => (
                                <div className='border d-flex align-item-center rounded p-2 mt-3'>
                                    <h5 className='ms-3 mt-2'>{item.title}</h5>
                                    <div className='ms-auto'>
                                        <Editproject project={item}/>
                                        <a href={item.github}><button className='btn '><i class='fa-brands fa-github fa-xl text-success'></i></button></a>
                                        <button className='btn ' onClick={() => handleDelete(item._id)}><i class='fa-solid fa-trash fa-xl text-danger'></i></button>
                                    </div>
                                </div>
                            )) :
                            <p className='text-danger fw-bolder mt-3'>No projects uploaded yet</p>
                    }

                </div>
            </div>
        </>
    )
}

export default Myproject