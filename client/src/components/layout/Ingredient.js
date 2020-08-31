import React, { Component } from "react";

function Ingredient(props) {
    return(
        <div className="card" style={{display:"inline-block",marginTop: 20, zIndex:-1}} >
        {/* <img src="..." class="card-img-top" alt="..."> */}
        <div class="card-body" style={{padding: 0}}>
        {/* <h5 className="card-title">Card title</h5> */}
            <table>
                <tr>
                <td>
                    <div className="card-text" style={{height:"100%",display:"block",padding:"5px 15px", margin:0}}>
                        Mozzarella Cheese Subsctitute asd asd asdas dasd 
                    </div>
                </td>
                <td className="align-middle">
                    {/* <div style={{height:"100%",backgroundColor:"blue"}}>height</div> */}
                    <a href="#" className="deleteButton btn btn-light" style={{display:"flex",verticalAlign: "middle",height:"100%",lineHeight:"100%",backgroundColor:"lightGrey",border:0,borderRadius:"0px!important", margin:0}}>X</a>
                </td>
                </tr>
            </table>
        </div>
        </div>
    )
}

export default Ingredient