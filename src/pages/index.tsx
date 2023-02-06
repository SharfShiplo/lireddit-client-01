import { Navbar } from "../components/navbar"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
const Index = () => {
  const [{data}] = usePostsQuery()
  return (

  <>
  <Navbar/>
  <div>
    {!data ? null : data.posts.map(p=> (<p key={p.id}>{p.title}</p>))}
  </div>
  </>
)}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
