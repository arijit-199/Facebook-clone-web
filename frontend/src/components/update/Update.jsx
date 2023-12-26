import "./update.scss";
import React, { useState } from 'react'
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Update = ({ setOpenUpdate, user }) => {

  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [inputs, setInputs] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    city: user.city || "",
    website: user.website || "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload/files", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (user) => {
      await makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate();
    let coverPicUrl;
    let profilePicUrl;
    coverPicUrl = coverPic ? await upload(coverPic) : user.coverPic;
    profilePicUrl = profilePic ? await upload(profilePic) : user.profilePic;
    mutation.mutate({ ...inputs, coverPic: coverPicUrl, profilePic: profilePicUrl });
    setOpenUpdate(false)
  };

  return (
    <div className="update">
      <h3>Edit basic information</h3>
      <button className="closeBtn" onClick={() => setOpenUpdate(false)}>X</button>
      <form>
        <div className="item">
          <label>Cover Photo</label>
          <input type="file" onChange={e => setCoverPic(e.target.files[0])} />
        </div>
        <div className="item">
          <label>Profile Photo</label>
          <input type="file" onChange={e => setProfilePic(e.target.files[0])} />
        </div>
        <div className="item">
          <label>Name</label>
          <input type="text" placeholder="name" name='name' onChange={handleChange} />
        </div>
        <div className="item">
          <label>Username</label>
          <input type="text" placeholder="username" name='username' onChange={handleChange} />
        </div>
        <div className="item">
          <label>Email</label>
          <input type="text" placeholder="email" name='email' onChange={handleChange} />
        </div>
        <div className="item">
          <label>City</label>
          <input type="text" placeholder="city" name='city' onChange={handleChange} />
        </div>
        <div className="item">
          <label>Website</label>
          <input type="text" placeholder="website" name='website' onChange={handleChange} />
        </div>
        <button onClick={handleSubmit}>Update</button>
      </form>
    </div>
  )
}

export default Update