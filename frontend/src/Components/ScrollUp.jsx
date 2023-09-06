import React,{useState,useEffect} from 'react'


const ScrollUp = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 200){
      setVisible(true)
    }else {
      setVisible(false)
    }
  }
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior:"smooth"
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.addEventListener('scroll',toggleVisible);
    };
  },[])
  return (
    <div className='scroll-to-top'>
     {isVisible && (
        <span onClick={scrollUp}>
            <i className="fa fa-arrow-up"/>
        </span>
     )}   
    </div>
  )
}

export default ScrollUp