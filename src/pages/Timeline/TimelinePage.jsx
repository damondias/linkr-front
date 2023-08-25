    import { useEffect, useState } from "react";
    import { Post, Publish } from "../../components/index.components";
    import { LeftWrapper, MainContainer, NoPost, Reloader, RightWrapper, TimelineContainer, TitleContainer } from "./TimelineStyles";
    import api from "../../services/api";
    import TrendingComponent from "../../components/trendingComponent";
    import useAuth from "../../hooks/useAuth";
    import InfiniteScroll from "react-infinite-scroller";
    import { IoRepeatSharp } from 'react-icons/io5';
    import useInterval from "use-interval";
    
    export default function Timeline(){
        const { user } = useAuth();
        
        const [posts, setPosts] = useState([]);
        const [isLoading, setLoading] = useState(false);
        const [error, setError] = useState(false);

        const NoPostYetMessage = "There are no posts yet";
        const ServerErrorMessage = `An error occured while trying to fetch the posts, please refresh the page`;

        const [offsetScroll, setOffsetScroll] = useState(10);
        const [hasMore, setHasMore] = useState(true);

        const [newPosts, setNewPosts] = useState([]);
        const [loadingNewPosts, setLoadingNewPosts] = useState(false);
       
        useEffect(() => {
            fetchPosts();
        }, []);
    
        useEffect(() => {
            if (newPosts.length > 0) {
                // Não atualiza automaticamente os novos posts na linha do tempo
            }
        }, [newPosts]);
    

        function fetchPosts() {
            setLoading(true);

            api.getPost(user?.token)
                .then(res => {
                    setPosts(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                    console.log(error);
                });
        }

        function getNewPosts() {
            setLoadingNewPosts(true);
            api.getPost(user?.token)
                .then(res => {
                    const incomingPosts = res.data;
                    const newPosts = incomingPosts.filter(post => new Date(post.createdAt) > new Date(posts[0]?.createdAt));
                    if (newPosts.length > 0) {
                        setNewPosts(newPosts);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoadingNewPosts(false);
                });
        }
    
        const handleLoadNewPosts = () => {
            setNewPosts([]);
            fetchPosts();
        };
    
        useInterval(getNewPosts, 15000);

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
                            {newPosts?.length > 0 &&  
                                <Reloader onClick={handleLoadNewPosts} >
                                    <span>{newPosts?.length} new posts, load more! </span><IoRepeatSharp size="20px" />
                                </Reloader>
                            }
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
