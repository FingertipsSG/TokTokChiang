// For navbar on hover to show products
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Logo from "../Assets/Images/toktoklogo.webp"


function Products() {
    return (
        <div classname="Admin Product">
            <h1>
                This is the products page
            </h1>
        </div>
    )
}

export default Products;