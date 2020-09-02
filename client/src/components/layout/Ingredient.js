import React, { Component } from "react";

function Ingredient(props) {
    return(
        <div className="card" style={{display:"inline-block",marginTop: 10, marginRight:10, zIndex:0}} >
        <div className="card-body" style={{padding: 0}}>
            <table>
            <tbody>
                <tr>
                <td>
                    <div className="card-text" style={{textTransform: "capitalize",height:"100%",display:"block",padding:"8px 10px", margin:0}}>
                        {props.name}
                    </div>
                </td>
                <td className="card-text deleteButton" style={{cursor: "pointer",padding:"8px 10px", margin:0}} onClick={()=>{props.remove(props.name)}}>
                    <div className="card-text" >
                        x
                    </div>
                </td>
                </tr>
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Ingredient