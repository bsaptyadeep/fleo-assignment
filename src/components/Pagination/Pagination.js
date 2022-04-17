import React from 'react';
import "./pagination.css";

const Pagination = ({ currentPage, repoPerPage, totalRep, paginate, prev, next }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRep / repoPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            {/* <p>hello</p> */}

            <ul className='pagination' style={{ listStyle: "none" }}>
                <li className='page-item'>
                    <a onClick={() => prev()} href='!#' className='page-link' style={{color:"black"}}>Previous</a>
                </li>
                {
                    pageNumbers.map(number => {
                        // console.log(number, currentPage)
                        return (
                            <li key={number} className="page-item">
                                <a onClick={() => paginate(number)} href='!#' className='page-link' style={currentPage===number? {backgroundColor:"blue", color:"white", border:"none"}:{color:"black"}}>
                                    {number}
                                </a>
                            </li>
                        );
                    })
                }
                <li className='page-item'>
                    <a onClick={() => next()} href='!#' className='page-link' style={{color:"black"}}>Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
