// For navbar on hover to show products
import { useState, Text } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import Button from 'react-bootstrap/Button';
import Logo from "../Assets/Images/toktoklogo.webp"
function SubsectionImage(img) {
    return <div id="image">
        <img src={img}></img>
    </div>
}

function SubsectionEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [contentState, setContentState] = useState(convertToRaw(ContentState.createFromText("hi")));
    const [convertedContent, setConvertedContent] = useState([]);


    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const handleEditorStateChange = (state) => {
        setEditorState(state)
        // convertContentToHtml()
    }

    const convertContentToHtml = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }

    return <div id="editor">
        <Editor
            editorState={editorState}
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={handleEditorStateChange}
            onContentStateChange={(contentState) => setContentState(contentState)}
        />
        <Button variant="primary" onClick={convertContentToHtml}>
            SUBMIT
        </Button>
        <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </div>
}


function SubSection(props) {
    if (props.img != null && props.editor) {
        return <div id="sub-section">
            <SubsectionImage img={props.img} />
            <SubsectionEditor />
        </div>
    } else if (props.img != null) {
        return <div id="sub-section">
            <SubsectionImage img ={props.img} />
        </div>
    } else if (props.editor) {
        return <div id="sub-section">
            <SubsectionEditor props={props} />
        </div>
    } else {
        return <div id="sub-section">NO IMAGE EDITOR</div>
    }
}

function Products() {
    
    return (
        <div classname="Product">
            <h1>
                This is the products page
            </h1>
            <div id="section">
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
            </div>
        </div>
    )
}

export default Products;