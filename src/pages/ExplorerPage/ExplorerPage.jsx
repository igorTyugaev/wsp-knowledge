import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import knowledgeService from "../../services/KnowledgeService";
import ExplorerCell from "../../components/ExplorerCell";
import "./ExplorerPage.scss";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

const ExplorerPage = ({ setTitle }) => {
  const { folderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const getResource = (folderId) => {
    if (!folderId) return knowledgeService.getRootDir();
    return knowledgeService.getDirById(folderId);
  };

  useEffect(() => {
    setLoading(true);
    getResource(folderId)
      .then((data) => {
        setData(data);
        data && data[0] && setTitle && setTitle(data[0]?.parentName);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [folderId]);

  if (loading) return <Loader />;
  if (!data) return <h2>Empty</h2>;

  return (
    <div className="explorer">
      {data.map(({ id, name, type }) => (
        <ExplorerCell key={id} id={id} title={name} type={type} />
      ))}
    </div>
  );
};

export default ExplorerPage;
