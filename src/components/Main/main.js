import React, { useEffect, useState } from 'react'
import Data from '../data/data';
import Dropdown from 'react-bootstrap/Dropdown'
import Pagination from '../Pagination/Pagination';
import "./main.css"
import 'bootstrap/dist/css/bootstrap.min.css';




const Main = () => {
    const [rep, setRep] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ name: "", lang: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [repoPerPage, setRepoPerPage] = useState(3);



    const getRep = async () => {
        try {
            const response = await fetch('https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc&page=1&per_page=10');
            const data = await response.json();
            setRep([...data.items])
            // console.log(rep);

        }
        catch (err) {
            console.log("Error fetching api data: ", err)
        }
    }
    useEffect(() => {
        getRep();
    }, []);

    const handleChange =  ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        // const search = rep.filter(curRep => curRep.name.match(new RegExp(data.name, "i")))
        // .filter(curRep => curRep.language.match(new RegExp(data.lang, "i")));
        // console.log(search);
        // setRep(search);
    };

    const indexOfLastRep = currentPage * repoPerPage;
    const indexOfFirstRep = indexOfLastRep - repoPerPage;
    const currentRep = rep.slice(indexOfFirstRep, indexOfLastRep);

    const paginate = (repNumber) => setCurrentPage(repNumber);
    const prev = () => {
        if (currentPage > 1)
            setCurrentPage(prev => prev - 1);
    }

    const next = () => {
        if (currentPage < Math.ceil(rep.length / repoPerPage))
            setCurrentPage(next => next + 1);
    }

    return (
        <div>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                // className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Search by language"
                    name="lang"
                    value={data.lang}
                    onChange={handleChange}
                />
                
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:"black"}}>
                        Sort repositories
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            const sorted = [...rep].sort((a,b) => a.stargazers_count - b.stargazers_count);
                            setRep(sorted);
                        }} href="#/action-1">Ascending on Star</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            const sorted = [...rep].sort((a,b) => b.stargazers_count - a.stargazers_count);
                            setRep(sorted);
                        }} href="#/action-2">Desending on Star</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            const sorted = [...rep].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
                            setRep(sorted);
                            console.log(sorted)
                        }} href="#/action-3">Ascending on Name</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            const sorted = [...rep].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : 0));
                            setRep(sorted);
                            console.log(sorted)
                        }} href="#/action-4">Desending on Name</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {
                rep.length !== 0 ?
                    <Data rep={currentRep} searchValue={data.name} searchLang={data.lang} />
                    :
                    <div>loading...</div>
            }
            <Pagination currentPage={currentPage} repoPerPage={repoPerPage} totalRep={rep.length} paginate={paginate} prev={prev} next={next} />
        </div>
    )
}

export default Main
