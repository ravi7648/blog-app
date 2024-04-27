import { useParams } from "react-router-dom";
import useGetUserById from "../../hooks/useGetUserById";
import Profile from "./Profile";

export default function AdminProfileView() {
  const { id } = useParams();
  const user = useGetUserById(Number(id));

  return <Profile user={user} />;
}
