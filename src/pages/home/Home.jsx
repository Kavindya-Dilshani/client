import { useState, useRef, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { apiEndpoints } from "../../endpoints/endpoints";
import { useAuth } from "../../utilities/auth/AuthContext";

const Home = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { getUser } = useAuth();

  // const [allImage, setAllImage] = useState(null);

  // useEffect(() => {
  //   getPDF();
  // }, []);

  // const getPDF = async () => {
  //   const result = await axios.get("http://localhost:5000/get-files");
  //   console.log(result.data.data);
  //   setAllImage(result.data.data);
  // };

  /**
   * Handles form submission for file upload.
   * Constructs a FormData object with file and title, sends a POST request using Axios,
   * and logs success or failure messages based on the server response.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create request
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("userId", getUser()?.userId);

    try {
      const response = await axios.post(apiEndpoints.uploadFile, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });

      if (response?.data?.status === "success") {
        console.log("file successfully uploaded!");
      } else {
        console.log("file uploading failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles file selection from input[type=file] element.
   * Sets the selected file to the state if a file is selected.
   * @param {*} event - The event object triggered by selecting a file.
   */
  const handleFiles = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  /**
   * Handles file drop event.
   * Sets the dropped file to the state if a file is dropped.
   * @param {*} event - The drop event object.
   */
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
  };

  /**
   * Prevents the default behavior of drag over event.
   * @param {*} event - The drag over event object.
   */
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /**
   * Triggers click on the file input element.
   */
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="home-container container mt-5">
        <div className="row my-5">
          <div className="upload-file-container border">
            <form
              className="upload-file-form col-md-8 mx-auto text-center py-5 px-5"
              onSubmit={handleSubmit}
            >
              <div className="form-title py-2 mb-3">
                <span>PDF HUB</span>
                <h4>Upload your file here</h4>
              </div>
              <div className="input-group pb-2">
                <input
                  type="text"
                  className="form-control form-control-lg bg-white fs-6"
                  placeholder="Enter file title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div
                className="file-drop-area mb-3 d-flex justify-content-center align-items-center rounded-2"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleButtonClick}
              >
                <div className="text-center">
                  {file?.name ? file?.name : "Select your file or drop it here"}
                </div>
                <input
                  className="d-none"
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleFiles}
                />
              </div>
              <div className="row upload-button m-0 justify-content-center">
                <button className="btn btn-secondary col-6 py-3" type="submit">
                  Upload
                </button>
              </div>
            </form>
          </div>

          <hr className="my-3" />
          {/* <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="home-title mb-4">
              <h2 className="text-black fs-2 mb-5 pb-5 mt-2">Uploaded Files</h2>
            </div>
            {allImage == null
              ? ""
              : allImage.map((data) => {
                  <p className="text-black text-wrap file-text w-100">
                    {data.title}
                  </p>;
                })}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
