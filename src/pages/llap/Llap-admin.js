import React from "react";
import "./Llap.css";
import api from "services/api";
import { useEffect } from "react";
import { useState } from "react";
import { monthShortName } from "../mcdWorldCup/Data";
import { useRef } from "react";

export default function LlapAdmin() {
  const [pic_list, setPicList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchFromLocal();
  }, []);

  const fetchFromLocal = async () => {
    try {
      let pic = await api.get("llap");
      const data = pic.data;
      setPicList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFromInstagram = async () => {
    setFetching(true);
    await api.get("llap/instagram");
    setFetching(false);
    fetchFromLocal();
  };

  const uploadPic = async (file_list) => {
    const formData = new FormData();
    for (const file_key in file_list) {
      if (!isNaN(file_key)) {
        const file = file_list[file_key];
        formData.append("images[]", file);
      }
    }
    let res = await api.post("llap/upload-img", formData);
    if (res.data.success) {
      fetchFromLocal();
    }
  };
  const handleSubmit = async () => {
    const selected_id_gp = selected.map((s) => s.insta_id);
    let res = await api.post("llap/submit", {
      selected_id_gp: selected_id_gp,
    });
    if (res.data.success) {
      alert("Submit Success! Will reflect on panel right away!.");
    } else {
      alert("Submit Fail! Will reflect on panel right away!.");
    }
  };

  const handleSelect = (pic) => {
    const old_pic = [...selected];
    if (checkIsSelected(pic.insta_id)) {
      const deleted_pic = old_pic.filter((old_p) => old_p.insta_id != pic.insta_id);
      setSelected(deleted_pic);
      return;
    }
    setSelected([...old_pic, pic]);
  };

  const formatDate = (date) => {
    // console.log(date);
    const d = new Date(date);
    const format_time = `${d.getDate()}-${monthShortName[d.getMonth()]}-${d.getFullYear()}`;
    return format_time;
  };

  const checkIsSelected = (id) => {
    return selected.filter((select) => select.insta_id == id).length > 0;
  };

  const RenderSelected = (outside, inner, preview) => {
    return (
      <div className="day-sec">
        <h3 className="day-head">{preview ? outside : formatDate(outside)}</h3>
        <div className="pic-gp">
          {inner.map((pic) => (
            <div style={{ width: preview ? "18%" : "22%" }} className={`pic-row ${checkIsSelected(pic.insta_id) ? "selected" : ""}`} key={pic.insta_id}>
              <img src={pic.img_url} alt="Panda" className="preview-img" />
              <button className="btn" disabled={!checkIsSelected(pic.insta_id) && selected.length >= 4} onClick={() => handleSelect(pic)}>
                {checkIsSelected(pic.insta_id) ? "Deselect" : "Select"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="LLAP-Admin">
      <div className="btn-gp">
        <button className="btn" onClick={getFromInstagram}>
          Fetch
        </button>
        <input
          className="btn"
          type="file"
          name="myImage"
          multiple
          onChange={(event) => {
            uploadPic(event.target.files);
            // setSelectedImage(event.target.files[0]);
          }}
        />

        <button className="btn" disabled={selected.length != 4} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {fetching && <div className="desc">Fetching from Instagram...</div>}
      {selected.length > 0 && RenderSelected("Preview Selected", selected, true)}

      {Object.keys(pic_list).map((date) => RenderSelected(date, pic_list[date], false))}

      <div className="pic-end">~ End ~</div>
    </div>
  );
}
