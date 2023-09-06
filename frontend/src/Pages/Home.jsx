import React,{useEffect, useState} from 'react'
import OurServices from '../Components/OurServices'
import Testimonials from '../Components/Testimonials'
import Questions from '../Components/Questions'
import HeroSection from '../Components/HeroSection'

import { 
collection,
deleteDoc,
doc,
limit,
onSnapshot,
query,
orderBy,
where,
startAfter,
getDocs

 } from 'firebase/firestore'
import { db } from '../firebase'
import {toast} from 'react-toastify'
import Tags from '../Components/Tags'
import Search from '../Components/Search'
import { useLocation } from 'react-router-dom'
import ContentSection from '../Components/ContentSection'
import TrendingSection from '../Components/TrendingSection'
import Category from '../Components/Category'
import FeaturedArticles from '../Components/FeaturedArticles'
import Spinner from '../Components/Spinner'
import {isEmpty, isNull} from 'lodash'
import Footer from "../Components/Footer"

// Obtain the url search parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Home = ({user,setActive,active}) => {

  const location = useLocation()
   
  //Declare states
  const [loading,setLoading] = useState(true);
  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState("")
  const [trendingArticles, setTrendingArticles] = useState([])
  const [totalArticles, setTotalArticles] = useState(null)
  const [lastVisible, setLastVisible] = useState(null)
  const [hide,setHide] = useState(false)

  const queryString = useQuery()
  // declare the search query string
  const searchQuery = queryString.get("searchQuery")


    //Get trending articles from firebase store
    const getTrendingArticles = async () => {
    //obtain a string reference that points to the location of the database
    const articleRef = collection(db,'article');
    //constructs a query that communicaes and obtain data from the database
    const trendingArticleQuery = query(articleRef, where("trending", "==", "yes"));
    //Obtain and capture the requested document with the query constructed above
    const querySnapshot = await getDocs(trendingArticleQuery)
    let trendingArticles = [];
    querySnapshot.forEach((doc) => {
      trendingArticles.push({id:doc.id, ...doc.data()})
    });
    setTrendingArticles(trendingArticles)
  };
  console.log(trendingArticles)

  useEffect(() => {
    getTrendingArticles();
    setSearch("")

    const unsubscribe = onSnapshot(
      collection(db,"article"),(snapshot) => {
        let  list = [];
       
        snapshot.docs.forEach((doc) => {
          list.push({id:doc.id,...doc.data});
       
          
        });
        setTotalArticles(list);
        setLoading(false)
        setActive("home")

      },(error) => {
        console.log(error)
      }
    );
    return () => {
      unsubscribe();
      getTrendingArticles();
    };
  }, [setActive,active])

  console.log(articles)

  useEffect(() => {
    getArticles()
    setHide(false)

  },[active])


  //get all articles
  const getArticles = async () => {
    const articleRef = collection(db,'article');
    console.log(articleRef);
    const fourArticles = query(articleRef,orderBy("title"), limit(4))
    const docSnapshot = await getDocs(fourArticles)
    setArticles(docSnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()})));
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length -1])
  }

  const updateState = (docSnapshot) => {
    const isCollectionEmpty = docSnapshot.size === 0;
    if (!isCollectionEmpty) {
      const articleData = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles((article) => [...article, ...articleData]);
      setLastVisible(docSnapshot.docs[docSnapshot.docs.length -1]);
    } else {
      toast.info("No more content to display");
      setHide(true);
    }
  };

  const fetchMore = async () => {
    setLoading(true);
    const blogRef = collection(db, "article");
    const nextFour = query(
      blogRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );
    const docSnapshot = await getDocs(nextFour);
    updateState(docSnapshot);
    setLoading(false);
  };

    const searchArticles = async () => {
    const blogRef = collection(db, "article");
    const searchTitleQuery = query(blogRef, where("title", "==", searchQuery));
    const searchTagQuery = query(
      blogRef,where("tags", "array-contains", searchQuery)
    );
    const titleSnapshot = await getDocs(searchTitleQuery);
    const tagSnapshot = await getDocs(searchTagQuery);

    let searchTitleArticles = [];
    let searchTagArticles = [];
    titleSnapshot.forEach((doc) => {
      searchTitleArticles.push({ id: doc.id, ...doc.data() });
    });
    tagSnapshot.forEach((doc) => {
      searchTagArticles.push({ id: doc.id, ...doc.data() });
    });
    const combinedSearchArticles = searchTitleArticles.concat(searchTagArticles);
    setArticles(combinedSearchArticles);
    setHide(true);
    setActive("");
  };

  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchArticles();
    }
  }, [searchQuery]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that article ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "article", id));
        toast.success("Article deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      console.log("test");
      getArticles();
      setHide(false);
    }
    setSearch(value);
  };

  // category count
  const counts = totalArticles.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    // delete prevValue["undefined"];
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  console.log("categoryCount", categoryCount);

  
 

  return (
    <>
    <HeroSection/>
    <div className='container-fluid pb-4 pt-4 padding'>
      <div className="container padding">
        <div className="row mx-0">
          <TrendingSection trendingArticles={trendingArticles}/>
          <div className="col-md-8">
            <div className="blog-heading text-start py-2 mb-4">Daily Feeds</div>
            {articles.length === 0 && location.pathname !== "/" && (
             <>
             <h4>No Content found with search keyword:{""}
             <strong>{searchQuery}</strong>
             </h4>
             </> 
            )}
            {articles.map((article) => (
              <ContentSection
              key={article.id}
              user={user}
              handleDelete={handleDelete}
             articles={article}/>
            ))}

            {!hide && (
              <button className="btn btn-primary" onClick={fetchMore}>
              See More
              </button>
            )}
          </div>
          <div className="col-md-3">
            <Search search={search} handleChange={handleChange}/>
           <FeaturedArticles title={"Most Popular"} articles={articles}/>
            <Category catContentsCount={categoryCount}/>
          </div>
        </div>
      </div>
      <OurServices/>
      <Testimonials/>
       <Questions/>
      <Footer/>
    </div>
    </>
  )
}

export default Home