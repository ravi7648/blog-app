import "./Home.css";
import { usePosts } from "../hooks/selector";
import PostHomeCard from "./post/PostHomeCard";
import Post from "../models/post";
import Loader from "./common/Loader";
import LoginButton from "./login/LoginButton";
import RegisterButton from "./signup/RegisterButton";

export default function Home() {
  const posts = usePosts();
  return (
    <>
      <section className="py-5">
        <div className="container w-800">
          <h1 className="jumbotron-heading py-3">
            Words That Echo: Insights, Inspiration, and Ideas
          </h1>
          <p className="lead text-muted py-3 mb-3">
            "Let the pages of our blog be a sanctuary for the wandering soul, a
            fountain of wisdom for the curious mind, and a beacon of inspiration
            for the seeker of truth."
          </p>
          <p>
            <LoginButton />
            <RegisterButton />
          </p>
        </div>
      </section>
      {posts.loading ? (
        <Loader />
      ) : (
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {posts.data?.map((post: Post) => (
                <div key={post.id} className="col-md-4">
                  <PostHomeCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
