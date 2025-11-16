import React, { useState } from 'react'
import './uploadimage.css'

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const API_BASE_URL = 'https://ngw9h44230.execute-api.ap-south-1.amazonaws.com/production'

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      
      setSelectedFile(file)
      setError(null)
      setImageUrl(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setError(null)
      setImageUrl(null)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setError('Please drop an image file')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Step 1: Get signed URL
      const fileName = selectedFile.name
      const fileType = selectedFile.type

      const response = await fetch(`${API_BASE_URL}/generate-signed-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileName,
          fileType: fileType,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate signed URL')
      }

      const data = await response.json()

      if (!data.success || !data.signedUrl) {
        throw new Error('Invalid response from server')
      }

      // Step 2: Upload file to signed URL using PUT
      const uploadResponse = await fetch(data.signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
        },
        body: selectedFile,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image')
      }

      // Step 3: Set the image URL
      setImageUrl(data.fileUrl)
      setError(null)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleCopyUrl = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreview(null)
    setImageUrl(null)
    setError(null)
    setCopied(false)
  }

  return (
    <div className="upload-image-container">
      <div className="upload-image-wrapper">
        <div className="upload-image-card">
          <h1 className="upload-image-title">
            Image Upload
          </h1>
          <p className="upload-image-subtitle">
            Upload your image and get a shareable URL
          </p>

          {!imageUrl ? (
            <>
              {/* File Selection Area */}
              <div
                className="file-drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="file-input"
                />
                
                {preview ? (
                  <div className="preview-section">
                    <img
                      src={preview}
                      alt="Preview"
                      className="preview-image"
                    />
                    <p className="preview-filename">
                      {selectedFile?.name}
                    </p>
                    <p className="preview-change-hint">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="drop-zone-content">
                    <div className="drop-zone-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="drop-zone-text">
                        Click to select or drag and drop
                      </p>
                      <p className="drop-zone-hint">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              {selectedFile && (
                <div className="button-container">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="upload-btn"
                  >
                    {uploading ? (
                      <>
                        <svg
                          className="spinner"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        Upload Image
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={uploading}
                    className="reset-btn"
                  >
                    Reset
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="success-state">
              <div className="success-header">
                <div className="success-icon-container">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="success-title">
                  Upload Successful!
                </h2>
                <p className="success-message">
                  Your image has been uploaded successfully
                </p>
              </div>

              {/* Image Display */}
              <div className="uploaded-image-container">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="uploaded-image"
                />
              </div>

              {/* URL Display */}
              <div className="url-section">
                <label className="url-label">
                  Image URL:
                </label>
                <div className="url-input-container">
                  <input
                    type="text"
                    value={imageUrl}
                    readOnly
                    className="url-input"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="copy-btn"
                  >
                    {copied ? (
                      <>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Upload Another Button */}
              <div>
                <button
                  onClick={handleReset}
                  className="upload-another-btn"
                >
                  Upload Another Image
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImage