import { useEffect, useState } from "react";
import { Post, Publish } from "../components/index.components";
import { LeftWrapper, MainContainer, NoPost, RightWrapper, TimelineContainer, TitleContainer } from "./Timeline/TimelineStyles";
import api from "../services/api";
import TrendingComponent from "../components/trendingComponent";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function UsersPage(){
    const { user } = useAuth();
    const {id} = useParams();
    const [owner, setOwner] = useState("")
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const NoPostYetMessage = "There are no posts yet";
    const ServerErrorMessage = `An error occured while trying to fetch the posts, please refresh the page`;

    function fetchPosts() {

        setLoading(true);

        api.getUsersPost(user?.token,id).then(res => {

            setPosts(res.data);
            setOwner(res.data[0]);
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
                            {owner.username}'s posts
                        </TitleContainer>
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