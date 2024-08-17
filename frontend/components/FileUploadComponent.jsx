import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function FileUploadComponent() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const verifyUploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      // Check if the file is an image
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        alert('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      return isImage;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        // Create a preview URL for the uploaded image
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result); // Set the image preview URL
        };
        reader.readAsDataURL(info.file.originFileObj);

        // Store the uploaded file in state
        setUploadedFile(info.file);
      }
    },
  };

  return (
    <div>
      {/* Conditionally render either the Dragger or the uploaded image preview */}
      {uploadedFile ? (
        <div className="p-3 w-full border rounded-lg flex flex-col mt-2.5 items-center">
          <img
            src={imagePreview}
            alt="Uploaded"
            className="rounded-lg mb-3"
            style={{ maxHeight: '200px', maxWidth: '100%' }}
          />
          <p>{uploadedFile.name}</p>
          <Button
            type="link"
            onClick={() => {
              setUploadedFile(null); // Allow user to re-upload by resetting the state
              setImagePreview(null); // Clear the image preview
            }}
          >
            Change File
          </Button>
        </div>
      ) : (
        <Dragger {...verifyUploadProps}>
          <div className="p-3 w-full border rounded-lg flex flex-col mt-2.5">
            <div
              className="items-center align-center flex justify-center h-1/5"
              style={{
                height: '8em',
              }}
            >
              <UploadOutlined style={{ fontSize: '6em', opacity: '0.6' }} />
            </div>
            <div
              className="flex justify-center align-center mb-3"
              style={{ opacity: '0.6' }}
            >
              Upload File
            </div>
          </div>
        </Dragger>
      )}
    </div>
  );
}

export default FileUploadComponent;