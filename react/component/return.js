import { Fragment, useState, useEffect } from 'react'
import Axios from 'axios'

const Return = (props) => {
    const [data, setData] = useState("Fetching..."),
        endPointSplit = props.endPoint.split("/"),
        id = endPointSplit[endPointSplit.length - 1];

    useEffect(() => {
        Axios(`https://opener.now.sh/api/${props.endPoint}`).then(data => {
            setData(data.data);
        });
    },[]);

    if(data === "Fetching..."){
        return(
            <>
                <h2>Return</h2>
                <p>* This return value is based on {id}</p>
                <ul>
                    <li>Fetching...</li>
                </ul>
            </>
        )
    } else {
        let arrName = Object.getOwnPropertyNames(data);
        return(
            <>
                <h2>Return</h2>
                <p>* This return value is based on {id}</p>
                <ul>
                    {arrName.map((name, index) =>
                        <Fragment key={index}>
                            <li>{name}: <span className="type">{ typeof(data[name]) }</span></li>
                            { typeof(data[name]) === "object" ? 
                                <ul>
                                    {Object.getOwnPropertyNames(data[name]).map((detail,index) =>
                                        <li key={index}>
                                            {detail}: <span className="type">{ typeof(data[name][detail]) }</span>
                                            { typeof(data[name][detail]) === "object" && !props.shallow ? 
                                                <ul>
                                                    {Object.getOwnPropertyNames(data[name][detail]).map((doc,index) =>
                                                        <li key={index}>
                                                            {doc}: <span className="type">{ typeof(data[name][detail][doc]) }</span>
                                                        </li>
                                                    )}
                                                </ul>
                                            : null }
                                        </li>
                                    )}
                                </ul>
                            : null }
                        </Fragment>
                    )}
                </ul>
            </>
        )
    }
}

Return.getInitialProps = async () => {
    const data = await Axios(`https://opener.now.sh/api/${props.endPoint}`)

    return {
      data: data
    };
}

export default Return