import { useState, useRef, useEffect } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [allImage, setAllImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getPDF();
  }, []);

  const getPDF = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("title", title);

    console.log(title, files);

    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-type": "multipart/form-data" },
      }
    );
    console.log(result);
  };

  const handleFiles = (event) => {
    setFiles([...event.target.files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...event.dataTransfer.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="home-container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
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
          </div>

          <div className="col-md-6 right-box">
            <form onSubmit={handleSubmit}>
              <div className="row align-items-center">
                <div className="home-header mb-4 text-center">
                  <h2>Upload your file here</h2>
                </div>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-white fs-6"
                    placeholder="File Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div
                  className="border-box mb-3"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleButtonClick}
                >
                  <p className="text-center pt-4">
                    Choose your file or drop here
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFiles}
                  />
                </div>
              </div>
              <div className="upload-button mb-3">
                <button className="btn btn-lg w-100 fs-6" type="submit">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
