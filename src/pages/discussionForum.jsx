import { Navigation } from "../components/common/navigation";
import { Footer } from "../components/common/footer";
import {Posts} from "../components/discussionForum/posts";
import { paginate } from '../components/utils/paginate.js';
import { api } from '../config.js';
import http from '../services/httpService';
import { useEffect, useState } from "react";


const Discussion = (props) => {
    const [allposts, setAllposts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState({ _id: '1', name: 'All Posts' });

    useEffect(() => {
    async function fetchData() {
        const { data: allposts } = await http.get(api.postsEndPoint);
        const { data: tags } = await http.get(api.tagsEndPoint);
        setAllposts(allposts);
        setTags([{ _id: '1', name: 'All Posts' }, ...tags]);
    }
    fetchData();
    }, []);

    const handlePageChange = (page) => {
    setCurrentPage(page);
    };

    const handlePostDelete = (post) => {};

    const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    };

    const getPosts = () => {
    const filtered = selectedTag._id === '1' ? allposts : allposts.filter(post =>
        post.tags.some(tag => tag.name === selectedTag.name)
    );
    return filtered;
    };

    const filtered = getPosts();
    const posts = paginate(filtered, currentPage, pageSize);

  return (
    <div>
      <Navigation />
      {/* <Header data={props.data.Header} /> */}
      {console.log(posts)}
      <div style={{'margin-top':'50px', 'padding': '50px'}}> 
        <Posts posts={posts} onDelete={handlePostDelete} />
        Showing {filtered.length} posts.
      </div>
      <Footer data={props.data.Contact} />
    </div>
  );
};

export default Discussion;
