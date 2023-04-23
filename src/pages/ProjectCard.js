import {useEffect, useState} from "react"
import axios from "axios";
import Navbar from "../components/Common/Navbar/navbar";
import Footer from "../components/Common/Footer/footer";
import './Card.css'
import { useNavigate } from "react-router-dom";
import AdSense from 'react-adsense';
import { Button, Form } from "react-bootstrap";

const ProjectCard= () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    const navigate = useNavigate();
    // const handleClick = (projectName) => {
    //     history.push(`/api/project/${projectName}`);
    // };
    const fetchData = async () => {

        const response = await axios.get('/api/project/projects')
        setProject(response.data)
        console.log(response.data);

    }
    const [Project, setProject] = useState([]);
    useEffect(()=>{
        //const fetchData = async () => {
            fetch(`/api/project/projects?page=${pageNumber}`)
      //      const response = await axios.get(`/api/project/projects?page=${page}`)
            .then((response) => response.json())
            .then(({ totalPages, projects }) => {
                setProject(projects);
              setNumberOfPages(totalPages);
            });
            //setProject(response.data)
            //console.log(response.data);

    //    }
      //  fetchData()
    },[pageNumber])

    const searchHandle = async (event)=>{
        let key = event.target.value ;
        if(key){
        let result = await fetch(`/api/project/search/${key}`)
        result = await result.json()
        if(result){
            setProject(result);
        } 
    }else{
        fetchData();
    }
    }
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };
    
      const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };
    
    return (
        <div>
            <Navbar/>
{/* search */}
<div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={searchHandle}
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>


            <div className="container">
            
           {/* Google Absense  */}
            <AdSense.Google
        client='6953905789'
        slot='pub-5945465024662753'
        style={{ display: 'block' }}
        format='auto'
        responsive='true'
      />
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5945465024662753"
     crossorigin="anonymous"></script>



<h3>Page of {pageNumber + 1}</h3>
                {
                    Project.map((curElem) => {
                        return (
                            <div className="card_item" key={curElem.id}>

                                <div className="card_inner">
                                    <img src={curElem.Image} alt="" />
                                    <div className="ProjectName">{curElem.ProjectName}</div>
                                    <div style={{overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitBoxOrient: "vertical",WebkitLineClamp: "3", height: "4.5em",marginBottom:"2%"}}>{curElem.Description}</div>


                                    <button className="btn btn-primary" onClick={() => navigate(`/project/${curElem.ProjectName}`)}>See More</button>
                      
                                </div>

                            </div>
                        )
                    })
                }

            </div>

            <button onClick={gotoPrevious}>Previous</button>
      {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gotoNext}>Next</button>
            <Footer/>

        </div>
    )
}

export default ProjectCard