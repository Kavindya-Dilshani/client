import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiEndpoints } from "../../endpoints/endpoints";

const PdfViewer = () => {
  // Get the 'id' parameter from the URL
  const { documentId } = useParams();
  const [file, setFile] = useState(null);

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
        });
        setFile(response?.data?.file);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (documentId) {
      getFiles();
    }
  }, [documentId]);

  return <div>{documentId}</div>;
};

export default PdfViewer;
