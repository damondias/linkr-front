    import { useEffect, useState } from "react";
    import { Post, Publish } from "../../components/index.components";
    import { LeftWrapper, MainContainer, NoPost, Reloader, RightWrapper, TimelineContainer, TitleContainer } from "./TimelineStyles";
    import api from "../../services/api";
    import TrendingComponent from "../../components/trendingComponent";
    import useAuth from "../../hooks/useAuth";
    import InfiniteScroll from "react-infinite-scroller";
    import useInterval from 'use-interval';
    import { IoRepeatSharp } from 'react-icons/io5';
    
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
        const [lastPostTime, setLastPostTime] = useState();
        
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

        useEffect(fetchPosts, [user?.token]);

        function getNewPosts() {
            console.log('console 02: getting more posts')
            api.getPost(user?.token)
                .then(res => verifyNewPosts(res.data))
                .catch(error => console.log(error));
                
        }
    
        function verifyNewPosts(incomingPosts) {
            const areAnyNew = incomingPosts.filter(post => post.id > lastPostTime);
            console.log(  { news: areAnyNew, posts : {incomingPosts}})
            if (areAnyNew.length > 0) {
                const newestPostId = areAnyNew[areAnyNew.length - 1]?.id;
                setLastPostTime(newestPostId);
                setNewPosts(areAnyNew);
            }
        }
        
        function loadNewPosts() {
            setPosts([...newPosts, ...posts]); // Concatena os novos posts com os existentes
            setNewPosts([]); // Limpa a lista de novos posts
        }
        

        useInterval(() => {
            getNewPosts();
        }, 15000);


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
                            {newPosts?.length > 0
                                &&  <Reloader onClick={() => loadNewPosts()}>
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