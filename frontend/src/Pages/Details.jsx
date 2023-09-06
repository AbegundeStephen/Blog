import React,{useState,useEffect} from 'react'
import {collection,
  doc,
  getDoc,
  limit,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  orderBy,
  where
} from "firebase/firestore";
import {isEmpty} from 'lodash'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentBox from '../Components/CommentBox'
import Like from '../Components/Like'
import FeaturedArticles from '../Components/FeaturedArticles';
import RelatedArticles from '../Components/RelatedArticles'
import Tags from '../Components/Tags';
import UserComments from '../Components/UserComments'
import { db } from '../firebase';
import Spinner from '../Components/Spinner';

const Details = ({setActive, user}) => {
  const userId = user?.uid
  const {id} = useParams()
  const [loading,setLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [tags, setTags] = useState([]);
  const [comments,setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [userComment,setUserComment] = useState("")
  const [relatedArticle, setRelatedArticle] = useState([])

  useEffect(() => {
    const getRecentArticles = async () => {
      const articleRef = collection(db, "article");
      const recentArticles = query(
        articleRef,orderBy("timestamp", "desc"), limit(5)
      );
      const docSnapshot = await getDocs(recentArticles);
      setArticles(docSnapshot.docs.map((doc) => ({id:doc.id,...doc.data()})));

    }
    getRecentArticles();
  }, []);

  useEffect(() => {
    id && getArticleDetail();
  },[id])
  if (loading) {
    return <Spinner/>
  }
  const getArticleDetail = async () => {
    setLoading(false);
    const articleRef = collection(db, 'article')
    const docRef = doc(db, 'article', id);
    const articleDetail = await getDoc(docRef);
    const articles = await getDocs(articleRef)

    let tags = [];

    articles.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
    setTags(uniqueTags)
    setArticle(articleDetail.data());

    const relatedArticleQuery = query(articleRef,where("tags", "array-contains",articleDetail.data().tags, limit(3)));
    setComments(articleDetail.data().comments ? articleDetail.data().comments : [] );
    setLikes(articleDetail.data().likes ? articleDetail.data().likes: []);
    const relatedArticleSnapshot = await getDocs(relatedArticleQuery);
    const relatedArticles = [];
    relatedArticleSnapshot.forEach((doc)=> {relatedArticles.push({id:doc.id, ... doc.data()})})
    setRelatedArticle(relatedArticle)
    setActive(null)
    setLoading(false)
  };

const handleComment =async (e) => {
      e.preventDefault()
      comments.push({
        createdAt: Timestamp.fromDate(new Date()),
        userId,
        name: user?.displayName,
        body: userComment
      });
      toast.success("Comment submitted succesfully");
      await updateDoc(doc(db, "article",id), {
        ...article,
        comments,
        timestamp: serverTimestamp(),
      });
      setComments(comments);
      setUserComment("");
  };


  const handleLike = async () => {
    if (userId) {
      if (article?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId)
          setLikes([...new Set(likes)]);

        }else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes)
        }
      }

      await updateDoc(doc(db,"article",id), {
        ...article,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  }

  console.log("relatedarticle",relatedArticle)

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${article?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{article?.timestamp.toDate().toDateString()}</span>
          <h2>{article?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{article?.author}</p> -&nbsp;
                {article?.timestamp.toDate().toDateString()}
                <Like handleLike={handleLike} likes={likes} userId={userId} />
              </span>
              <p className="text-start">{article?.description}</p>
              <div className="text-start">
                <Tags tags={article?.tags} />
              </div>
              <br />
              <div className="custombox">
                <div className="scroll">
                  <h4 className="small-title">{comments?.length} Comment</h4>
                  {isEmpty(comments) ? (
                    <UserComments
                      msg={
                        "No Comment yet posted on this article. Be the first to comment"
                      }
                    />
                  ) : (
                    <>
                      {comments?.map((comment) => (
                        <UserComments {...comment} />
                      ))}
                    </>
                  )}
                </div>
              </div>
              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </div>
            <div className="col-md-3">
              <div className="blog-heading text-start py-2 mb-4">Tags</div>
              <Tags tags={tags} />
              <FeaturedArticles title={"Recent Articles"} articles={articles} />
            </div>
          </div>
          <RelatedArticles id={id} articles={articles} />
        </div>
      </div>
    </div>
  )
}

export default Details