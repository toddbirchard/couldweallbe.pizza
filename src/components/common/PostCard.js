import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

import '../../styles/post-card.less'

const PostCard = ({ post }) => {
    const author = post.primary_author
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)
    const authorImage = author.profile_image
    const authorName = author.name
    const authorUrl = post.primary_author.slug && `/author/${post.primary_author.slug}/`

    return (
        <Link to={url} className="post-card">

            {post.feature_image &&
              <div className="post-card-image" style={{backgroundImage: `url(${post.feature_image})`}}></div>
            }

            <div className="post-card-body">
                <header className="post-card-header">
                    {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={false} /></div>}
                    {post.featured && <span>Featured</span>}
                    <h2 className="post-card-title">{post.title}</h2>
                </header>
                <section className="post-card-excerpt">{post.excerpt}</section>
                <footer className="post-card-footer">
                    <div className="post-card-footer-left">
                        <div className="post-card-avatar">
                          <Link to={authorUrl}>
                            {authorImage ?
                                <img className="author-profile-image" src={authorImage} alt={authorName}/> :
                                <img className="default-avatar" src="/images/icons/avatar.svg" alt={authorName}/>
                            }
                          </Link>
                        </div>
                        <div>
                          <Link className="author-name" to={authorUrl}>{authorName}</Link>
                          <div className={"reading-time"}>{readingTime}</div>
                        </div>
                    </div>
                </footer>
            </div>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
