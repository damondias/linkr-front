import { useEffect, useState } from "react";
import { Post, Publish } from "../../components/index.components";
import { LeftWrapper, MainContainer, NoPost, RightWrapper, TimelineContainer, TitleContainer } from "./TimelineStyles";
import api from "../../services/api";
import TrendingComponent from "../../components/trendingComponent";
import useAuth from "../../hooks/useAuth";

export default function Timeline(){
    const { user } = useAuth();
    
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const NoPostYetMessage = "There are no posts yet";
    const ServerErrorMessage = `An error occured while trying to fetch the posts, please refresh the page`;

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

    useEffect(fetchPosts, []);

    return(
        <>
            <>Header</>
            <MainContainer>
                <LeftWrapper>
                    <TimelineContainer>
                        <TitleContainer>
                            timeline
                        </TitleContainer>
                        <Publish />
                        {isLoading
                            ? <h2> Loading ... </h2>
                            : posts?.length === 0
                                ? <NoPost>{NoPostYetMessage}</NoPost>
                                : error === true
                                    ? <NoPost>{ServerErrorMessage}</NoPost>
                                    : (
                                        posts?.map((post) =>
                                            <Post
                                                key={post.id}
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
                                        )
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