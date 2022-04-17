import React from 'react'
import './data.css';

const Data = ({ rep, searchValue, searchLang }) => {
    console.log(rep)
    // rep.sort((a,b) => (a.name > b.name) ? 1 : ((b.name> a.name) ? -1 : 0))
    return (
        <div className='data'>
            {
                rep.filter(curRep => curRep.name.match(new RegExp(searchValue, "i")))
                .filter(curRep => curRep.language.match(new RegExp(searchLang, "i")))
                .map((curRep) => {
                    // console.log(curRep)

                    return (
                        <div key={curRep.id}>
                            {/* <img src={require(curRep.owner.avatar_url)} alt="Logo"/> */}
                            <a href={curRep.html_url} style={{textDecoration:"none", color:"black"}}>
                                <div className="card-details">
                                    <ul style={{ listStyle: "none" }}>
                                        <li><p><span>{curRep.name}</span> by {curRep.owner.login}</p></li>
                                        <li><p>{curRep.description}</p></li>
                                        <li>
                                            <ul className="star-fork" style={{ listStyle: "none" }}>
                                                <li><img src={require('./images/star.png')} height="12" />{curRep.stargazers_count}</li>
                                                <li><img src={require('./images/fork.png')} height="12" />{curRep.forks}</li>
                                            </ul>
                                        </li>
                                        <li><h5>{curRep.language}</h5></li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    );
                })
            }
        </div>
    )
}



export default Data