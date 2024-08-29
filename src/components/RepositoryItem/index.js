import './index.css'

const RepositoryItem = props => {
  const {data} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = data

  return (
    <li className="repo-container-item">
      <img src={avatarUrl} alt={name} className="image-style" />
      <div className="text-container-repo">
        <h1 className="heading-repo">{name}</h1>
        <div className="div-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="image"
          />
          <p>{starsCount}</p>
        </div>
        <div className="div-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="image"
          />
          <p>{forksCount}</p>
        </div>
        <div className="div-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="image"
          />
          <p>{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
