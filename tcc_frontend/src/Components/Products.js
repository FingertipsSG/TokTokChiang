// For navbar on hover to show products
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Logo from "../Assets/Images/toktoklogo.webp"


function Products() {
    return (
        <div classname="Product">
            {/* <h1>
                This is the products page
            </h1> */}
            {/* <div id="section">
                <SubSection img={Logo} editor={false} />
                <SubSection editor={true} />
                <SubSection img={Logo} />
                <SubSection />
            </div>
            <div id="section">
                <SubSection img={Logo} editor={false} />
                <SubSection editor={true} />
                <SubSection img={Logo} />
                <SubSection />
            </div> */}
            <div className='imagePlaceHolder'>
                This is an image 1 placeholder
            </div>
            <div className='imagePlaceHolder'>
                This is an image 2 placeholder
            </div>
            <div className='imagePlaceHolder'>
                This is an image 3 placeholder
            </div>
            <div className='imagePlaceHolder'>
                This is an image 4 placeholder
            </div>
        </div>
    )
}

export default Products;