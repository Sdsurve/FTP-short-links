import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import LinksCard from '../../components/LinksCard/LinksCard.jsx';
import Navbar from '../../components/Navbar/Navbar';
import "./Home.css";
import star from "./star.png";
import bgimg from "./bg-img.png";
import share from "./share.png";
import shrink from "./shrink.png";
import link from "./link.png";

function Home() {
    const [linkData, setLinkData] = useState({
        title: "",
        target: "",
        slug: "",
    });

    const [links, setLinks] = useState([]);
    const [user, setUser] = useState(null);

    const fetchAllLinks = async () => {
        if (!user || !user._id) {
            return;
        }
        try {
            toast.loading("Loading links...");
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/links?userId=${user._id}`);
            toast.dismiss();
            console.log('Fetched Links:', response.data);
            setLinks(response.data.data);
            toast.success("All links fetched successfully");
        } catch (error) {
            console.error('Error fetching links:', error);
            toast.error('Failed to fetch links.');
        }
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            setUser(currentUser);
        } else {
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchAllLinks();
        }
    }, [user]);

    const shortenURL = async (e) => {
        e.preventDefault();
        const { title, target, slug } = linkData;
        
        if (!title || !target || !slug) {
            toast.error("Please enter all details");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/link`, 
            {
                title,
                target,
                slug,
                user: user?._id
            });
            if (response.data.success) {
                toast.success("Link shortened successfully");
                setLinkData({
                    title: "",
                    target: "",
                    slug: ""
                });
                fetchAllLinks(); // Fetch updated links
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while shortening the link.");
        }
    };

    return (
        <div style={{padding:"0",margin:"0"}}>
            <Navbar/>

            <h2 className='sub-title'>
                <span><img src={link} className='title-img' alt="" />Link,</span> 
                <span><img src={shrink} className='title-img' alt="" />Shrink,</span> 
                <span> <img src={share} className='title-img' alt="" />Share</span>
            </h2>
            <h1 className='Title'><img src={star} style={{height:"25px",marginRight:"15px"}} alt="" />Shrink Your Links🔗</h1>
         
            <div className='main-div'>
                <form className='link-form ' onSubmit={shortenURL}>
                    <h3>Welcome...</h3>
                    <h2>{user?.fullName}</h2>
                    <label htmlFor="">Title (Optional):</label>
                    <input
                        type="text"
                        placeholder="Title"
                        className='link-inputs form-control'
                        value={linkData.title}
                        onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
                    />

                    <label htmlFor="">URL :</label>
                    <input
                        type="text"
                        placeholder="URL"
                        className='link-inputs form-control'
                        value={linkData.target}
                        onChange={(e) => setLinkData({ ...linkData, target: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Slug"
                        value={linkData.slug}
                        className='link-inputs form-control'
                        onChange={(e) => setLinkData({ ...linkData, slug: e.target.value })}
                    />
                    <button type="submit" className='register-btn'>Generate</button>
                </form>
                <div className='img-div'>
                    <h1 className='title-1'>Build stronger..💪🏻 <br />
                    digital connections..🤝</h1>
                    <img src={bgimg} alt="" className='bg-img' />
                </div>
            </div>

            <div>
                <h1 className='sub-title'>😉My Links...</h1>
                <div className='links-div'>
                    {links.map((link) => {
                        const {_id, title, target, slug, views, createdAt } = link;
                        return (
                            <LinksCard
                                key={_id}
                                _id={_id}
                                title={title}
                                target={target}
                                slug={slug}
                                views={views}
                                createdAt={createdAt}
                            />
                        );
                    })}
                    {links.length === 0 && <h1 className='link-error'>No links available</h1>}
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Home;
