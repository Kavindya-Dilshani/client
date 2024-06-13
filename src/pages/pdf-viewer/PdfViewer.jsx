import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiEndpoints } from "../../endpoints/endpoints";

const PdfViewer = () => {
  // Get the 'id' parameter from the URL
  const { documentId } = useParams();
  const [fileTitle, setFileTitle] = useState("");

  useEffect(() => {
    const getFiles = async () => {
      try {
        // Get auth token from local storage
        const token = localStorage.getItem("authToken");
        const response = await axios.get(apiEndpoints.getFile, {
          params: { documentId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });

        // Handle response
        if (response.status === 200) {
          // Extract the filename from the Content-Disposition header
          const contentDisposition = response.headers["content-disposition"];
          const filename = contentDisposition
            ? contentDisposition.split("filename=")[1].replace(/"/g, "")
            : "unknown.pdf";
          setFileTitle(filename);

          // Create a blob object from the response data
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });

          // Create a temporary URL for the blob
          const url = URL.createObjectURL(blob);

          // Create a link element
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = filename;

          // Append the link to the body and click it
          document.body.appendChild(a);
          a.click();

          // Clean up
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          throw new Error("Failed to fetch PDF");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (documentId) {
      getFiles();
    }
  }, [documentId]);

  return (
    <>
      <div className="container">
        <p className="py-5">
          Your selected file, <span className="fw-bold">{fileTitle}</span> ,
          will be downloaded...
        </p>
      </div>
    </>
  );
};

export default PdfViewer;
