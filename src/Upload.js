import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Upload(props) {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);

    const navigate = useNavigate();

    const changeHandler = (event) => {
        setError(null);
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleUpload = () => {
        setError(null);
        setLoading(true);
        const formData = new FormData();

        console.log('Uploading the file "' + selectedFile.name + "'");

        formData.append('File', selectedFile);

        axios.post(
            'http://localhost:4000/memes/upload', formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(response => {
            console.log('Upload succesful!');
            setLoading(false);
            navigate('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response) {
                setError("Error found: " + error.response.data.message);
            } else if (error.request) {
                setError(error.request);
            } else {
                setError(error.message);
            }
        });
    }

    return <div>
        <h2>Upload</h2>
        <p>Select an image to upload</p>
        <input type="file" name="newImage" id="newImage" onChange={changeHandler} />
        {isFilePicked ? (
            <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
            </div>
        ) : (
            <p>Select a file to show details</p>
        )}
        <input type="button" onClick={handleUpload} value="Upload image" name="upload" />
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
    </div>
}

export default Upload;