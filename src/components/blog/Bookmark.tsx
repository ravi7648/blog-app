import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Post from "../../models/post";
import { useAddBookmark, useRemoveBookmark } from "../../hooks/useReduxDispatchers";
import User from "../../models/user";

export default function Bookmark({ className, user, post }: { className?: string, user: User, post: Post }) {
    const addBookmark = useAddBookmark();
    const removeBookmark = useRemoveBookmark();
    const isBookmarked = user?.bookmarkedPosts?.includes(post.id);

    const addToBookmark = () => {
        addBookmark({ userId: user?.id || 0, postId: post.id })
    }

    const removeFromBookmark = () => {
        removeBookmark({ userId: user?.id || 0, postId: post.id })
    }

    return <>
        {isBookmarked
            ? <FontAwesomeIcon icon={faBookmarkSolid} style={{ color: "#0d6efd" }} className={className + " cursor-pointer"} onClick={removeFromBookmark} />
            : <FontAwesomeIcon icon={faBookmarkRegular} style={{ color: "#0d6efd" }} className={className + " cursor-pointer"} onClick={addToBookmark} />
        }
    </>;
}