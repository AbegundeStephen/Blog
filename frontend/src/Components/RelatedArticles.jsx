import React from 'react'
import Card from '../Components/Card'

const RelatedArticles = ({articles, id}) => {
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-2 mb-4">
        Related Articles
      </div>
      <div className="col-md-12 text-left justify-content-center">
        <div className="row gx-5">
          {articles.length === 1 && (
            <h5 className="text-center">
              Related Articles not found with this current Article
            </h5>
          )}
          {articles
            ?.filter((articles) => articles.id !== id)
            .map((item) => (
              <Card {...item} key={item.id}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedArticles