//import "./NewsView.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewsView() {
  let { id } = useParams();
  const [news, setNews] = useState();

  useEffect(() => {
    async function getNews() {
      const data = await axios.get("https://sheltered-plateau-06495.herokuapp.com/newsposts/" + id);
      setNews(data?.data);
    }
    getNews();
  }, [id]);

  async function deleteNews() {
    if (window.confirm("Do you want to delete this news?")) {
      await axios.delete("https://sheltered-plateau-06495.herokuapp.com/newsposts/" + id);
      window.history.pushState(null, "", "/news");
      window.location.reload();    
    }
  }
  return (
    <div className="newsview">
      <div
        className="newsviewimg"
        style={{ backgroundImage: `url(${news?.imageUrl})` }}
      ></div>
      <div className="newsview-content">
        <div className="newsviewtitlesection">
          <div className="newsviewtitle">
            <h1>{news?.title}</h1>
          </div>
          <div className="newsviewdetails">
            <span style={{ flex: "1", color: "rgb(99 98 98)" }}>
              Written By: <span>{news?.writtenBy}</span>
            </span>
            <span style={{ flex: "1", color: "rgb(99 98 98)" }}>
              Date: <span>{news?.created_at}</span>
            </span>
          </div>
        </div>
        <div className="newsviewbody">{news?.body}</div>
      </div>
    </div>
  );
}