// For navbar on hover to show products
import { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import Button from 'react-bootstrap/Button';
import DOMPurify from 'dompurify';


function AdminProducts() {
    const [formData, setFormData] = useState()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [contentState, setContentState] = useState(convertToRaw(ContentState.createFromText("")));
    const [convertedContent, setConvertedContent] = useState([]);
    const [uploadedData, setUploadedData] = useState([]);
    const imageRef = useRef();
    const [isSelected, setIsSelected] = useState(false);

    function updateDatabase() {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        var formDataUpload = new FormData();
        formDataUpload.append("file", formData);
        formDataUpload.append("text", currentContentAsHTML);
        //TODO : push to database image and HTML
        fetch(
			'BACK END',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

        //For testing
        // setConvertedContent(currentContentAsHTML)
        // setUploadedData(formData);
        // setIsSelected(true);

        //clear input fields
        setEditorState(EditorState.createEmpty());
        setContentState(convertToRaw(ContentState.createFromText("")));
        setFormData();
        imageRef.current.value = "";
    }

    const handleEditorStateChange = (state) => {
        setEditorState(state)
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div classname="Product">
            <h1>
                This is the admin products page
            </h1>
            <div id="upload-image">
                <input type="file" ref={imageRef} onChange={(event) => setFormData(event.target.files[0])}></input>
            </div>
            <div id="upload-text">
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbar-class"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    onEditorStateChange={handleEditorStateChange}
                    onContentStateChange={(contentState) => setContentState(contentState)}
                />
            </div>
            <div id="upload-product">
                <Button variant="primary" onClick={updateDatabase}>
                    SUBMIT
                </Button>
            </div>
            {/* <div id="check">
                {isSelected ? (
                    <div>
                        <p>Filename: {uploadedData}</p>
                        <p>Filetype: {uploadedData.type}</p>
                        <p>Size in bytes: {uploadedData.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {uploadedData.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )
                }
                <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
            </div> */}
        </div>
    )
}

export default AdminProducts;