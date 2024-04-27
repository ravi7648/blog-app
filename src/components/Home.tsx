import "./Home.css";
import { usePosts } from "../hooks/useReduxSelectors";
import BlogHomeCard from "./blog/BlogHomeCard";
import Post from "../models/post";
import Loader from "./shared/Loader";
import LoginButton from "./login/LoginButton";
import RegisterButton from "./signup/RegisterButton";
import useTitleSetter from "../hooks/useTitleSetter";
import { PAGE_TITLES } from "../constants/pageTitles";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Home() {
  const posts = usePosts();
  const filteredPosts = posts.data?.filter((post) => post.isPublished) || [];
  const currentUser = useCurrentUser();
  useTitleSetter(PAGE_TITLES.HOME);

  return (
    <>
      <section className="py-5 w-100">
        <div className="container w-800">
          <h1 className="jumbotron-heading py-3">
            Words That Echo: Insights, Inspiration, and Ideas
          </h1>
          <p className="lead text-muted py-3 mb-3">
            "Let the pages of our blog be a sanctuary for the wandering soul, a
            fountain of wisdom for the curious mind, and a beacon of inspiration
            for the seeker of truth."
          </p>
          {!currentUser && (
            <p>
              <LoginButton />
              <RegisterButton />
            </p>
          )}
        </div>
      </section>
      {posts.loading ? (
        <Loader />
      ) : (
        <div className="album py-5 bg-light w-100">
          <div className="container">
            <div className="row">
              {filteredPosts.map((post: Post) => (
                <div key={post.id} className="col-md-4">
                  <BlogHomeCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
