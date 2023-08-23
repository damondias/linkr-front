import { useEffect, useState } from "react";
import { Post, Publish } from "../../components/index.components";
import { LeftWrapper, MainContainer, NoPost, RightWrapper, TimelineContainer, TitleContainer } from "./TimelineStyles";
import api from "../../services/api";
import TrendingComponent from "../../components/trendingComponent";
import useAuth from "../../hooks/useAuth";
import InfiniteScroll from "react-infinite-scroller";

export default function Timeline(){
    const { user } = useAuth();
    
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const NoPostYetMessage = "There are no posts yet";
    const ServerErrorMessage = `An error occured while trying to fetch the posts, please refresh the page`;

    const [offsetScroll, setOffsetScroll] = useState(10);
    const [hasMore, setHasMore] = useState(true);


    function fetchPosts() {

        setLoading(true);

        api.getPost(user?.token).then(res => {

            setPosts(res.data);
            setLoading(false);

        }).catch(error => {

            setLoading(false);
            setError(true);

            console.log(error);
        });
    }

    useEffect(fetchPosts, [user?.token
    ]);

    const loadPosts = async () => {
        const loadMorePosts = await api.getPost(user?.token, offsetScroll);

        return loadMorePosts;
    }

    const loadFunc = async () => {
        const { data: morePosts } = await loadPosts();

        console.log(morePosts.length);
        if (morePosts.length < 10) {
            setPosts(posts.concat(morePosts));
            return setHasMore(false);
        }

        setPosts(posts.concat(morePosts));
        setOffsetScroll(offsetScroll + 10);
    }

    return(
        <>
            <MainContainer>
                <LeftWrapper>
                    <TimelineContainer>
                        <TitleContainer>
                            timeline
                        </TitleContainer>
                        <Publish fetchPosts={fetchPosts} userToken={user?.token}/>
                        {isLoading
                            ? <h2> Loading ... </h2>
                            : posts?.length === 0
                                ? <NoPost>{NoPostYetMessage}</NoPost>
                                : error === true
                                    ? <NoPost>{ServerErrorMessage}</NoPost>
                                    : (
                                        <InfiniteScroll
                                            className='infinite-scroll'
                                            pageStart={0}
                                            loadMore={loadFunc}
                                            hasMore={hasMore}
                                            loader={<div className="loader" key={0}>Loading ... </div>}
                                        >
                                            {posts?.map((post,index) =>
                                                <Post
                                                    key={index}
                                                    postId={post.id}
                                                    url={post.url}
                                                    title={post.urlTitle}
                                                    description={post.urlDescription}
                                                    image={post.urlImage}
                                                    message={post.message}
                                                    name={post.name}
                                                    profilePic={post.profilePic}
                                                    userId={post.userId}
                                                />
                                            )}
                                        </InfiniteScroll>
                                    )}
                    </TimelineContainer>
                </LeftWrapper>
                <RightWrapper>
                    <TrendingComponent/>
                </RightWrapper>
        </MainContainer>
        </>        
    );
}